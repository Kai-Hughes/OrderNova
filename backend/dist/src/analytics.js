"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analyticsHandler_1 = require("./analyticsHandler");
const pg_1 = require("pg");
const Errors_1 = require("./Errors");
const tokenHandler_1 = require("./tokenHandler");
const router = express_1.default.Router();
// startTime, endTime formatted as yyyy-mmm (e.g 2041-feb)
router.get('/v1/users/analytics/monthlycosts', tokenHandler_1.authenticateJWT, async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const { userId } = req.user;
    let analytics = [];
    try {
        analytics = await (0, analyticsHandler_1.getMonthlyCosts)(userId, startDate, endDate);
    }
    catch (err) {
        if (err instanceof pg_1.DatabaseError) {
            return res.status(500).json({ error: err.message });
        }
        else if (err instanceof Errors_1.InvalidInfo) {
            return res.status(400).json({ error: err.message });
        }
    }
    return res.status(200).json(analytics);
});
// Total orders this month
router.get('/v1/users/analytics/totalorders', tokenHandler_1.authenticateJWT, async (req, res) => {
    const { userId } = req.user;
    try {
        const dailyOrders = await (0, analyticsHandler_1.getOrdersByDay)(userId);
        return res.status(200).json(dailyOrders);
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to fetch total orders.' });
    }
});
// Top product categories this month
router.get('/v1/users/analytics/topcategories', tokenHandler_1.authenticateJWT, async (req, res) => {
    const { userId } = req.user;
    try {
        const categories = await (0, analyticsHandler_1.getTopProductCategories)(userId);
        return res.status(200).json(categories);
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to fetch product categories.' });
    }
});
// Average order value this month
router.get('/v1/users/analytics/averageordervalue', tokenHandler_1.authenticateJWT, async (req, res) => {
    const { userId } = req.user;
    try {
        const averageValue = await (0, analyticsHandler_1.getAverageOrderValue)(userId);
        return res.status(200).json({ averageValue });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to fetch average order value.' });
    }
});
exports.default = router;
