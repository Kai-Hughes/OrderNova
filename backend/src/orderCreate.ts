import express, { Request, Response } from "express";
import { DBgetUserInfo, DBgetDoc } from "./database";
import { transporter, createOrderEmail } from "./email";
import { AuthRequest } from "./object";
import { createOrder } from "./orderHandler";
import { authenticateJWT } from "./tokenHandler";

const router = express.Router();

router.post("/v1/users/orders/create", authenticateJWT, async (req: Request, res: Response) => {
    const { userId }  = (req as unknown as AuthRequest).user;
    const { buyer, seller, items, payment } = req.body;
    try {
        // Check if the user exists
        const userExists = await DBgetUserInfo(userId);
        if (userExists == undefined) {
            return res.status(404).json({ error: "User not found" });
        }
        // Call the function to create the order
        const result = await createOrder(userId, buyer, seller, items, payment);
        // console.log(result);
        const sendContents = (await DBgetDoc(result.orderId)).filecontents.toString();
        // console.log(sendContents);
        try {
            await transporter.sendMail(await createOrderEmail(buyer.buyerEmail, sendContents));
        }
        catch(err) {
            return res.status(200).json(result); // this will happen when GMAIL reaches its daily limit
        }
        return res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        // Fallback for unknown error types
        return res.status(400).json({ error: "DB Is Unresponsive" });
    }
});

export default router;