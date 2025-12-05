import express, { Request, Response } from "express";
import axios from "axios";
import { authenticateJWT } from "./tokenHandler";
import { otherAPIAuth } from "./externalAuth";

const router = express.Router();

router.delete("/v1/invoices/delete/:invoiceId", authenticateJWT, async (req: Request, res: Response) => {
    try {
        const token = await otherAPIAuth();
        const externalApiResponse = await axios.delete(
        `https://seng2021-t11a-gg.9n5c02mxxr5nc.ap-southeast-2.cs.amazonlightsail.com/invoices/${req.params.invoiceId}`,
        {
            headers: {
                token: token
            }
        }
    );
        res.status(200).send(externalApiResponse.data);
    } catch (error) {
        // console.error("Error calling external invoice API:", error);
        console.log(req.params);
        res.status(400).json({ error: "Failed to delete invoice" });
    }
});


export default router;