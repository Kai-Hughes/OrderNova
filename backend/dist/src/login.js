"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const app_1 = require("./app");
const tokenHandler_1 = require("./tokenHandler");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = express_1.default.Router();
router.post('/v1/users/login', async (req, res) => {
    console.log(req.body);
    const loginInfo = {
        email: req.body.email,
        password: req.body.password
    };
    let user;
    try {
        user = await (0, database_1.DBgetUserId)(loginInfo.email);
    }
    catch (err) {
        return res.status(400).send({ error: "Invalid Email or Password" });
    }
    try {
        const userDetails = await (0, database_1.DBgetUserInfo)(user.userid);
        if (!bcryptjs_1.default.compareSync(req.body.password, userDetails.password.toString()) || userDetails.useremail != loginInfo.email) {
            return res.status(400).send({ error: "Invalid Email or Password" });
        }
        const token = (0, tokenHandler_1.generateToken)(userDetails.userid.toString(), userDetails.useremail.toString());
        app_1.sessionMap[token] = true;
        console.log("logged in");
        return res.status(200).send({ token: token });
    }
    catch (err) {
        return res.status(404).json({ error: "User Does Not Exist" });
    }
});
exports.default = router;
