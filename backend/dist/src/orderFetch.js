"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderHandler_1 = require("./orderHandler");
const tokenHandler_1 = require("./tokenHandler");
const router = express_1.default.Router();
router.get("/v1/users/orders/fetch/:orderId", tokenHandler_1.authenticateJWT, async (req, res) => {
    const { orderId } = req.params;
    const { userId } = req.user;
    try {
        const orderXML = await (0, orderHandler_1.orderFetchSingleOrder)(userId, orderId);
        res.status(200).send(orderXML);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === "Invalid orderId") {
                return res.status(400).json({ error: "Invalid orderId" });
            }
            else if (error.message === "Unauthorized") {
                return res.status(401).json({ error: "Unauthorized" });
            }
        }
    }
});
exports.default = router;
