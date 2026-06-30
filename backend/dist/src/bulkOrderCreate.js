"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const orderHandler_1 = require("./orderHandler");
const email_1 = require("./email");
const tokenHandler_1 = require("./tokenHandler");
const router = express_1.default.Router();
router.post("/v1/users/orders/bulk-create", tokenHandler_1.authenticateJWT, async (req, res) => {
    const { userId } = req.user;
    const orders = req.body;
    console.log('Received Orders:', JSON.stringify(orders, null, 2)); // Log the received orders
    if (!Array.isArray(orders)) {
        return res.status(400).json({ error: "Invalid orders data. Expected an array of orders." });
    }
    try {
        const userExists = await (0, database_1.DBgetUserInfo)(userId);
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
            const result = await (0, orderHandler_1.createOrder)(userId, buyer, seller, items, payment);
            results.push(result);
            // Fetch the document contents for the email
            const sendContents = (await (0, database_1.DBgetDoc)(result.orderId)).filecontents.toString();
            // Send email notification
            try {
                await email_1.transporter.sendMail(await (0, email_1.createOrderEmail)(buyer.buyerEmail, sendContents));
            }
            catch (err) {
                console.error(`Failed to send email for order ${result.orderId}:`, err);
                // Continue processing other orders even if email fails
            }
        }
        return res.status(200).json({ message: "Bulk orders created successfully!", results });
    }
    catch (error) {
        console.error('Error processing bulk orders:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = router;
