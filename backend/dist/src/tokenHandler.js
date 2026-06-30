"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = require("./app");
const generateToken = (userId, email) => {
    return jsonwebtoken_1.default.sign({ userId: userId, email: email, }, // Payload
    app_1.secretKey, // Secret Key
    { expiresIn: '24h' } // or '7d', whatever makes sense for a demo
    );
};
exports.generateToken = generateToken;
const authenticateJWT = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).send({ error: "Unauthorized - Invalid or missing token" });
    }
    else if (!app_1.sessionMap[token]) {
        return res.status(401).send({ error: "Unauthorized - Invalid or missing token" });
    }
    else {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, app_1.secretKey);
            req.user = { ...decoded, token };
            // console.log(decoded);
            next();
        }
        catch (err) {
            return res.status(401).send({ error: "Unauthorized - Invalid or missing token" });
        }
    }
};
exports.authenticateJWT = authenticateJWT;
