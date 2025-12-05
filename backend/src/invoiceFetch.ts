import express, { Request, Response } from "express";
import axios from "axios";
import { authenticateJWT } from "./tokenHandler";
import { otherAPIAuth } from "./externalAuth";

const router = express.Router();

router.get("/v1/invoices/fetch/:invoiceId", authenticateJWT, async (req: Request, res: Response) => {
    try {
        console.log("fetching the invoice")
        console.log(req.params.invoiceId)
        const token = await otherAPIAuth();
        const externalApiResponse = await axios.get(
        `https://seng2021-t11a-gg.9n5c02mxxr5nc.ap-southeast-2.cs.amazonlightsail.com/invoices/${req.params.invoiceId}`,
        {
            headers: {
                token: token
            }
        }
    );
        console.log(req.body);
        res.status(externalApiResponse.status).json(externalApiResponse.data);
    } catch (error) {
        // console.error("Error calling external invoice API:", error);
        res.status(400).json({ error: "Failed to fetch invoice" });
    }
});


export default router;