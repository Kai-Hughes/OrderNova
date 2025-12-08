
import  jwt  from 'jsonwebtoken';
import { secretKey, sessionMap } from './app';
import { NextFunction, Request, Response  } from 'express';
import { AuthRequest } from './object';


export const generateToken = (userId: string, email: string) => {
    return jwt.sign(
        { userId: userId, email: email, }, // Payload
        secretKey, // Secret Key
    );
};


export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).send({error: "Unauthorized - Invalid or missing token"});
    }
    else if (!sessionMap[token]) {
        return res.status(401).send({error: "Unauthorized - Invalid or missing token"});
    }
    else {
        try {
            const decoded = jwt.verify(token, secretKey) as { userId: string; email: string };
            (req as unknown as AuthRequest).user = {...decoded, token}
            // console.log(decoded);
            next();
        }
        catch (err) {
            return res.status(401).send({error: "Unauthorized - Invalid or missing token"});
        }
    }
}