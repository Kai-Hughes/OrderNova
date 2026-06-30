"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tokenHandler_1 = require("./tokenHandler");
const app_1 = require("./app");
const router = express_1.default.Router();
router.delete('/v1/users/logout', tokenHandler_1.authenticateJWT, (req, res) => {
    delete app_1.sessionMap[req.user.token];
    console.log("logged out");
    return res.status(200).send({ message: "Logged out successfully" });
});
exports.default = router;
