import express, { Request, Response }from 'express'
import { authenticateJWT } from './tokenHandler';
import { AuthRequest } from './object';
import { sessionMap } from './server';

const router = express.Router();

router.delete('/v1/users/logout', authenticateJWT, (req: Request, res:Response) => {
    delete sessionMap[(req as unknown as AuthRequest).user.token];
    console.log("logged out");
    return res.status(200).send({message: "Logged out successfully"})
});

export default router;