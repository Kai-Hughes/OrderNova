"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const email_1 = require("./email");
const orderHandler_1 = require("./orderHandler");
const tokenHandler_1 = require("./tokenHandler");
const router = express_1.default.Router();
router.post("/v1/users/orders/create", tokenHandler_1.authenticateJWT, async (req, res) => {
    const { userId } = req.user;
    const { buyer, seller, items, payment } = req.body;
    try {
        // Check if the user exists
        const userExists = await (0, database_1.DBgetUserInfo)(userId);
        if (userExists == undefined) {
            return res.status(404).json({ error: "User not found" });
        }
        // Call the function to create the order
        const result = await (0, orderHandler_1.createOrder)(userId, buyer, seller, items, payment);
        // console.log(result);
        const sendContents = (await (0, database_1.DBgetDoc)(result.orderId)).filecontents.toString();
        // console.log(sendContents);
        try {
            await email_1.transporter.sendMail(await (0, email_1.createOrderEmail)(buyer.buyerEmail, sendContents));
        }
        catch (err) {
            return res.status(200).json(result); // this will happen when GMAIL reaches its daily limit
        }
        return res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        // Fallback for unknown error types
        return res.status(400).json({ error: "DB Is Unresponsive" });
    }
});
exports.default = router;
