import express, { Request, Response } from "express";
import { DBgetUserInfo, DBgetDoc } from "./database";
import { createOrder } from "./orderHandler";
import { transporter, createOrderEmail } from "./email";
import { AuthRequest } from "./object";
import { authenticateJWT } from "./tokenHandler";

const router = express.Router();

router.post("/v1/users/orders/bulk-create", authenticateJWT, async (req: Request, res: Response) => {
    const { userId } = (req as unknown as AuthRequest).user;
    const orders = req.body;

    console.log('Received Orders:', JSON.stringify(orders, null, 2)); // Log the received orders

    if (!Array.isArray(orders)) {
        return res.status(400).json({ error: "Invalid orders data. Expected an array of orders." });
    }

    try {
        const userExists = await DBgetUserInfo(userId);
        if (!userExists) {
            return res.status(404).json({ error: "User not found" });
        }

        const results = [];
        for (const order of orders) {
            const { buyer, seller, items, payment } = order;

            // Validate the fields
            if (!buyer || !seller || !items || !payment) {
                return res.status(400).json({ error: "Incorrect data-field" });
            }

            // Create the order
            const result = await createOrder(userId, buyer, seller, items, payment);
            results.push(result);

            // Fetch the document contents for the email
            const sendContents = (await DBgetDoc(result.orderId)).filecontents.toString();

            // Send email notification
            try {
                await transporter.sendMail(await createOrderEmail(buyer.buyerEmail, sendContents));
            } catch (err) {
                console.error(`Failed to send email for order ${result.orderId}:`, err);
                // Continue processing other orders even if email fails
            }
        }

        return res.status(200).json({ message: "Bulk orders created successfully!", results });
    } catch (error) {
        console.error('Error processing bulk orders:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;