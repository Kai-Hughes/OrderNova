"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otherAPIAuth = void 0;
const axios_1 = __importDefault(require("axios"));
const otherAPIAuth = async () => {
    try {
        const registerResponse = await axios_1.default.post("https://seng2021-t11a-gg.9n5c02mxxr5nc.ap-southeast-2.cs.amazonlightsail.com/register", {
            username: "FantasticFive",
            email: "kaijohnhughes2004@gmail.com",
            password: "ILOVEMONEY1!"
        });
        const loginResponse = await axios_1.default.post("https://seng2021-t11a-gg.9n5c02mxxr5nc.ap-southeast-2.cs.amazonlightsail.com/login", {
            email: "kaijohnhughes2004@gmail.com",
            password: "ILOVEMONEY1!"
        });
        return loginResponse.data.token;
    }
    catch (error) {
        const loginResponse = await axios_1.default.post("https://seng2021-t11a-gg.9n5c02mxxr5nc.ap-southeast-2.cs.amazonlightsail.com/login", {
            email: "kaijohnhughes2004@gmail.com",
            password: "ILOVEMONEY1!"
        });
        return loginResponse.data.token;
    }
};
exports.otherAPIAuth = otherAPIAuth;
