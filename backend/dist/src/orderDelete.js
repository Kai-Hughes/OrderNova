"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderHandler_1 = require("./orderHandler");
const tokenHandler_1 = require("./tokenHandler");
const email_1 = require("./email");
const router = express_1.default.Router();
router.delete('/v1/users/orders/delete/:orderId', tokenHandler_1.authenticateJWT, async (req, res) => {
    const { orderId } = req.params;
    const { userId } = req.user;
    try {
        const deletedOrderId = await (0, orderHandler_1.deleteOrder)(userId, orderId);
        return res.status(200).send(deletedOrderId);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === "Invalid orderId") {
                return res.status(400).send({ error: "Invalid orderId" });
            }
            return res.status(400).send({ error: error.message });
        }
        return res.status(500).send({ error: "DB Is Unresponsive" });
    }
});
router.delete('/v2/users/orders/delete/:orderId', tokenHandler_1.authenticateJWT, async (req, res) => {
    const { orderId } = req.params;
    const { userId, email } = req.user;
    try {
        const deletedOrderId = await (0, orderHandler_1.deleteOrder)(userId, orderId);
        try {
            console.log("sending delete email");
            await email_1.transporter.sendMail(await (0, email_1.deleteOrderMail)(email));
        }
        catch (err) {
            return res.status(200).send(deletedOrderId); // this will happen when GMAIL reaches its daily limit
        }
        return res.status(200).send(deletedOrderId);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === "Invalid orderId") {
                return res.status(400).send({ error: "Invalid orderId" });
            }
            return res.status(400).send({ error: error.message });
        }
        return res.status(500).send({ error: "DB Is Unresponsive" });
    }
});
exports.default = router;
