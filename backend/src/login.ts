
import express, { Request, Response } from 'express'; 
import { DBgetUserId, DBgetUserInfo } from "./database";
import { sessionMap } from "./server";
import { generateToken } from "./tokenHandler";
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/v1/users/login', async (req: Request, res: Response) => {
    console.log(req.body);
    const loginInfo = {
        email: req.body.email,
        password: req.body.password
    };
    let user;
    try {
       user = await DBgetUserId(loginInfo.email);
    }
    catch (err) {
        return res.status(400).send({error: "Invalid Email or Password"});

    }
    try {
    const userDetails = await DBgetUserInfo(user.userid);
    if (!bcrypt.compareSync(req.body.password, userDetails.password.toString()) || userDetails.useremail != loginInfo.email) {
        return res.status(400).send({error: "Invalid Email or Password"});
    }
    const token = generateToken(userDetails.userid.toString(), userDetails.useremail.toString());
    sessionMap[token] = true;
    console.log("logged in")
    return res.status(200).send({token: token});
    }
    catch (err) {
        return res.status(404).json({error: "User Does Not Exist"});
    }
});

export default router;