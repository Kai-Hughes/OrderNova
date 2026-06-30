"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { DBConnect } from "./database";
const router = express_1.default.Router();
router.get('/v1/health', async (req, res) => {
    // try {
    //     await DBConnect();
    //     return res.status(500).send({db: "DB Is Unresponsive"});
    // }
    // catch (err) {
    //     // console.log(err);
    //     return res.status(200).send({db: "DP Is Connected To Server", time: Date.now()});
    // }
});
exports.default = router;
