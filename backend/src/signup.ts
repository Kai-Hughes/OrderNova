import express, { Request, Response } from "express";
import { User } from "./object";
import validator from "validator";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { DBgetUserId, DBaddUser } from "./database";
import { transporter, createSignupEmail } from "./email";


const router = express.Router();


router.post('/v1/users/signup', async (req: Request, res: Response) => {
    console.log(req.body);
    if (!validateUser(req.body as User)) {
        return res.status(400).send({error: "Invalid Format"});
    }
    const newUser: User = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10), // will need to encrypt this later on since we're just passing it via the body
        phone: req.body.phone,
        userId: nanoid(), 
    }
    const existingUser = await DBgetUserId(newUser.email);
    if (existingUser != undefined) {
        return res.status(409).send({error: "Account Already Exists"});
    }
    try {
        await DBaddUser(newUser.userId, newUser.email, newUser.name, newUser.phone, newUser.password);
    }
    catch (err) {
        // console.error("Error while adding user to DB:", err); // Log the error here
        console.log(err);
        return res.status(400).json({error: "User Could Not Be Added"});
    }
    const protocol = req.protocol; // 'http' or 'https'
    const host = req.get('host'); // e.g., 'localhost:3000' or 'example.com'
    const fullUrl = `${protocol}://${host}/users/login}`;
    try {
        await transporter.sendMail(await createSignupEmail(newUser.name, newUser.email, fullUrl));
    }
    catch(err) {
    }
    console.log("Account Made");
    return res.status(200).send({message: "Account Created", userId: newUser.userId});
});


function validateUser(checkUser: User): boolean { // come back here and use a library that actually checks emails
    return checkUser != null && typeof checkUser.name == "string"
    && typeof checkUser.email == "string" && typeof checkUser.password == "string"
    && typeof checkUser.phone == "string" && validator.isEmail(checkUser.email) && validator.isLength(checkUser.password, {min: 8});
}


export default router;