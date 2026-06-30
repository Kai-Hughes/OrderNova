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
router.put("/v1/users/orders/update/:orderId", tokenHandler_1.authenticateJWT, async (req, res) => {
    const { orderId } = req.params;
    const updatedFields = req.body;
    const { userId, email } = req.user;
    if (!Object.keys(updatedFields).length) {
        return res.status(400).send({ error: "Must Contain Update Field" });
    }
    try {
        const updatedXML = await (0, orderHandler_1.updateOrder)(orderId, updatedFields);
        try {
            await (0, email_1.updateOrderMail)(email, updatedXML);
        }
        catch (error) {
            return res.status(200).json({ updatedXML }); // this is for when the GMAIL doesn't work
        }
        return res.status(200).json({ updatedXML });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
router.put("/v2/users/orders/update/:orderId", tokenHandler_1.authenticateJWT, async (req, res) => {
    const { orderId } = req.params;
    const updatedFields = req.body;
    const { userId, email } = req.user;
    const validFields = ["buyer", "seller", "items", "payment"];
    const containsValidField = validFields.some(field => field in updatedFields);
    if (!Object.keys(updatedFields).length || !containsValidField) {
        return res.status(400).send({ error: "Must contain at least one of the following fields: buyer, seller, items, payment" });
    }
    try {
        const updatedXML = await (0, orderHandler_1.updateOrder)(orderId, updatedFields);
        try {
            console.log("sending update email");
            await email_1.transporter.sendMail(await (0, email_1.updateOrderMail)(email, updatedXML));
        }
        catch (error) {
            return res.status(200).json({ updatedXML }); // this is for when the GMAIL doesn't work
        }
        return res.status(200).json({ updatedXML });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = router;
