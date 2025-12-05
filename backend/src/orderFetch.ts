import express, { Request, Response } from "express";
import { AuthRequest } from "./object";
import { orderFetchSingleOrder } from "./orderHandler";
import { authenticateJWT } from "./tokenHandler";

const router = express.Router();

router.get("/v1/users/orders/fetch/:orderId", authenticateJWT, async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { userId }  = (req as unknown as AuthRequest).user;

    try {
        const orderXML = await orderFetchSingleOrder(userId, orderId);
        res.status(200).send(orderXML);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "Invalid orderId") {
                return res.status(400).json({ error: "Invalid orderId" });
            } else if (error.message === "Unauthorized") {
                return res.status(401).json({ error: "Unauthorized" });
            }
        }
    }
});

export default router;