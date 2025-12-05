import express, { Request, Response } from "express";
import axios from "axios";
import { authenticateJWT } from "./tokenHandler";
import { otherAPIAuth } from "./externalAuth";

const router = express.Router();

router.put("/v1/invoices/update/:invoiceId", authenticateJWT, async (req: Request, res: Response) => {
    try {
        const token = await otherAPIAuth();
        const externalApiResponse = await axios.put(
        `https://seng2021-t11a-gg.9n5c02mxxr5nc.ap-southeast-2.cs.amazonlightsail.com/invoices/${req.params.invoiceId}`,
        req.body,
        {
            headers: {
                token: token
            }
        }
    );
        res.status(externalApiResponse.status).send(externalApiResponse.data);
    } catch (error) {
        // console.error("Error calling external invoice API:", error);
        res.status(400).json({ error: "Failed to update invoice" });
    }
});


export default router;