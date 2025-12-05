import express, { Request, Response } from "express";
import axios from "axios";
import { authenticateJWT } from "./tokenHandler";
import { otherAPIAuth } from "./externalAuth";

const router = express.Router();

router.put("/v1/invoices/validate/:invoiceId", authenticateJWT, async (req: Request, res: Response) => {
    try {
        const token = await otherAPIAuth();
        // console.log(token, req.params.invoiceId)
        const externalApiResponse = await axios.put(
        `https://seng2021-t11a-gg.9n5c02mxxr5nc.ap-southeast-2.cs.amazonlightsail.com/invoices/${req.params.invoiceId}/validate`, {},
        {
            headers: {
                token: token
            }
        }
    );
        // console.log(req.body);
        res.status(200).send(externalApiResponse.data);
    } catch (error) {
        // console.error("Error calling external invoice API:", error);
        // console.log(error);
        res.status(400).json({ error: "Failed to validate invoice" });
    }
});


export default router;