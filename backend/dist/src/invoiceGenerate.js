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
router.post("/v1/invoices/create", tokenHandler_1.authenticateJWT, async (req, res) => {
    console.log(req.body);
    try {
        const token = await (0, externalAuth_1.otherAPIAuth)();
        console.log("i am being printed");
        // console.log(token);
        console.log(req.body);
        const externalApiResponse = await axios_1.default.post("https://seng2021-t11a-gg.9n5c02mxxr5nc.ap-southeast-2.cs.amazonlightsail.com/create-invoice", req.body, // Forward the request body
        {
            headers: {
                token: token
            }
        });
        // console.log(externalApiResponse);
        res.status(200).send(externalApiResponse.data);
    }
    catch (error) {
        // console.error("Error calling external invoice API:", error);c
        // console.log("error");
        // console.log(error);
        console.log(error);
        res.status(400).send({ error: "Failed to generate invoice" });
    }
});
exports.default = router;
