"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const nanoid_1 = require("nanoid");
const database_1 = require("./database");
const email_1 = require("./email");
const router = express_1.default.Router();
router.post('/v1/users/signup', async (req, res) => {
    console.log(req.body);
    if (!validateUser(req.body)) {
        return res.status(400).send({ error: "Invalid Format" });
    }
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs_1.default.hashSync(req.body.password, 10), // will need to encrypt this later on since we're just passing it via the body
        phone: req.body.phone,
        userId: (0, nanoid_1.nanoid)(),
    };
    const existingUser = await (0, database_1.DBgetUserId)(newUser.email);
    if (existingUser != undefined) {
        return res.status(409).send({ error: "Account Already Exists" });
    }
    try {
        await (0, database_1.DBaddUser)(newUser.userId, newUser.email, newUser.name, newUser.phone, newUser.password);
    }
    catch (err) {
        // console.error("Error while adding user to DB:", err); // Log the error here
        console.log(err);
        return res.status(400).json({ error: "User Could Not Be Added" });
    }
    const fullUrl = `${process.env.FRONTEND_URL}/login`;
    try {
        await email_1.transporter.sendMail(await (0, email_1.createSignupEmail)(newUser.name, newUser.email, fullUrl));
    }
    catch (err) {
    }
    console.log("Account Made");
    return res.status(200).send({ message: "Account Created", userId: newUser.userId });
});
function validateUser(checkUser) {
    return checkUser != null && typeof checkUser.name == "string"
        && typeof checkUser.email == "string" && typeof checkUser.password == "string"
        && typeof checkUser.phone == "string" && validator_1.default.isEmail(checkUser.email) && validator_1.default.isLength(checkUser.password, { min: 8 });
}
exports.default = router;
