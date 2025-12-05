import express, { Request, Response } from "express";
import axios from "axios";
import { authenticateJWT } from "./tokenHandler";
import { otherAPIAuth } from './externalAuth';

const router = express.Router();

router.post("/v1/invoices/create", authenticateJWT, async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const token = await otherAPIAuth();
        console.log("i am being printed")
        // console.log(token);
        console.log(req.body);
        const externalApiResponse = await axios.post(
        "https://seng2021-t11a-gg.9n5c02mxxr5nc.ap-southeast-2.cs.amazonlightsail.com/create-invoice",
            req.body, // Forward the request body
            {
                headers: {
                    token : token
                }
                
            }
        );
        // console.log(externalApiResponse);
        res.status(200).send(externalApiResponse.data);
    } catch (error) {
        // console.error("Error calling external invoice API:", error);c
        // console.log("error");
        // console.log(error);
        console.log(error);
        res.status(400).send({ error: "Failed to generate invoice" });
    }
});

export default router;