import express, { Request, Response } from "express";
import { updateOrder } from "./orderHandler";
import { authenticateJWT } from "./tokenHandler";
import { transporter, updateOrderMail } from "./email";
import { AuthRequest } from "./object";

const router = express.Router()

router.put("/v1/users/orders/update/:orderId", authenticateJWT, async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const updatedFields = req.body; 
    const { userId, email }  = (req as unknown as AuthRequest).user;
    
    if (!Object.keys(updatedFields).length) {
        return res.status(400).send({error: "Must Contain Update Field"});
    }
    try {
        const updatedXML = await updateOrder(orderId, updatedFields);
        try {
            await updateOrderMail(email, updatedXML)
        }
        catch (error) {
            return res.status(200).json({ updatedXML }); // this is for when the GMAIL doesn't work
        }
        return res.status(200).json({ updatedXML });
    } catch (error: any) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
    
});


router.put("/v2/users/orders/update/:orderId", authenticateJWT, async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const updatedFields = req.body; 
    const { userId, email }  = (req as unknown as AuthRequest).user;

    const validFields = ["buyer", "seller", "items", "payment"];
    const containsValidField = validFields.some(field => field in updatedFields);

    if (!Object.keys(updatedFields).length || !containsValidField) {
        return res.status(400).send({ error: "Must contain at least one of the following fields: buyer, seller, items, payment" });
    }
    try {
        const updatedXML = await updateOrder(orderId, updatedFields);
        try {
            console.log("sending update email")
            await transporter.sendMail(await updateOrderMail(email, updatedXML));
        }
        catch (error) {
            return res.status(200).json({ updatedXML }); // this is for when the GMAIL doesn't work
        }
        return res.status(200).json({ updatedXML });
    } catch (error: any) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
    
});


export default router;