import express, { Request, Response } from "express";
import { AuthRequest } from "./object";
import { deleteOrder } from "./orderHandler";
import { authenticateJWT } from "./tokenHandler";
import { deleteOrderMail, transporter } from "./email";
import { DBgetUserInfo } from "./database";

const router = express.Router();

router.delete('/v1/users/orders/delete/:orderId', authenticateJWT, async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { userId }  = (req as unknown as AuthRequest).user;

    try {
      const deletedOrderId = await deleteOrder(userId, orderId);
      return res.status(200).send(deletedOrderId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "Invalid orderId") {
          return res.status(400).send({ error: "Invalid orderId" });
        }
        return res.status(400).send({ error: error.message });
      }
      return res.status(500).send({ error: "DB Is Unresponsive" });
    }
});


router.delete('/v2/users/orders/delete/:orderId', authenticateJWT, async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { userId, email }  = (req as unknown as AuthRequest).user;
  try {
    const deletedOrderId = await deleteOrder(userId, orderId);
    try {
      console.log("sending delete email")
      await transporter.sendMail(await deleteOrderMail(email));
    }
    catch(err) {
      return res.status(200).send(deletedOrderId); // this will happen when GMAIL reaches its daily limit
    }
    return res.status(200).send(deletedOrderId);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "Invalid orderId") {
        return res.status(400).send({ error: "Invalid orderId" });
      }
      return res.status(400).send({ error: error.message });
    }
    return res.status(500).send({ error: "DB Is Unresponsive" });
  }
});

export default router;