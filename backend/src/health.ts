import express, { Request, Response } from "express";
import { DBConnect } from "./database";


const router = express.Router();

router.get('/v1/health', async (req: Request, res: Response) => {
    try {
        await DBConnect();
        return res.status(500).send({db: "DB Is Unresponsive"});
    }
    catch (err) {
        // console.log(err);
        return res.status(200).send({db: "DP Is Connected To Server", time: Date.now()});
    }
});

export default router;