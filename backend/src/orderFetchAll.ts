import express, { Request, Response } from "express";
import { DBgetUBLDocs } from "./database";
import { authenticateJWT } from "./tokenHandler";
import xml2js from 'xml2js'

const router = express.Router()

router.get('/v1/users/orders/fetch', authenticateJWT, async (req: Request, res: Response) => {
  
    const userId = (req as any).user.userId
    const allowedKeys = new Set([
      "buyerName", "buyerABN", "buyerAddress", "buyerPostcode", "buyerCity", "buyerState", "buyerCountry", "buyerPhone", "buyerEmail",
      "sellerName", "sellerABN", "sellerAddress", "sellerPostcode", "sellerCity", "sellerState", "sellerCountry", "sellerPhone", "sellerEmail"
    ]);
    for (const key of Object.keys(req.query)) {
      if (!allowedKeys.has(key)) {
        console.log("DEBUG: Incorrect query key:", key);
        return res.status(400).json({ error: "Incorrectly formatted JSON query object" });
      }
    }
    
    try {
      // Retrieve all orders (UBL documents) for the user.
      const orders = await DBgetUBLDocs(userId);
    //   console.log("Fetched orders from DB:", orders);
      let orderIds: string[] = orders.map(order => order.orderId);
      
      // If there are query parameters, filter the orders based on them.
      if (Object.keys(req.query).length > 0) {
        const parser = new xml2js.Parser({ explicitArray: false });
        const filteredOrderIds: string[] = [];
        for (const order of orders) {
          try {
            const jsonOrder = await parser.parseStringPromise(order.fileContents);
            // Assume the root element is "Order"
            const orderData = jsonOrder.Order;
            let matches = true;
            for (const key in req.query) {
              const queryValue = req.query[key];
              // Check if the query value matches in buyer OR seller (case sensitive equality)
              if (
                (orderData.buyer && orderData.buyer[key] === queryValue) ||
                (orderData.seller && orderData.seller[key] === queryValue)
              ) {
                // key matches
              } else {
                matches = false;
                break;
              }
            }
            if (matches) {
              filteredOrderIds.push(order.orderId);
            }
          } catch (parseError) {
            // console.error("Error parsing XML for order:", order.orderId, parseError);
          }
        }
        orderIds = filteredOrderIds;
      }
    //   console.log("Returning order IDs:", orderIds);
      return res.status(200).json({ orderIds });
    } catch (error) {
    //   console.error("Error in fetchOrders:", error);
      return res.status(400).json({ error: "DB Is Unresponsive" });
    }
});

export default router;