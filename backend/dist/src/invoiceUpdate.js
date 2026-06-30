"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const tokenHandler_1 = require("./tokenHandler");
const externalAuth_1 = require("./externalAuth");
const router = express_1.default.Router();
router.put("/v1/invoices/update/:invoiceId", tokenHandler_1.authenticateJWT, async (req, res) => {
    try {
        const token = await (0, externalAuth_1.otherAPIAuth)();
        const externalApiResponse = await axios_1.default.put(`https://seng2021-t11a-gg.9n5c02mxxr5nc.ap-southeast-2.cs.amazonlightsail.com/invoices/${req.params.invoiceId}`, req.body, {
            headers: {
                token: token
            }
        });
        res.status(externalApiResponse.status).send(externalApiResponse.data);
    }
    catch (error) {
        // console.error("Error calling external invoice API:", error);
        res.status(400).json({ error: "Failed to update invoice" });
    }
});
exports.default = router;
