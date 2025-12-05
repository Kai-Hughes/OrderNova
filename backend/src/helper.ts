import xml2js from "xml2js";
import { Buyer, Seller, Item, Payment, Order } from "./object";

// Function to Validate Order Data
export const isOrderDataValid = (buyer: Buyer, seller: Seller, items: Item[], payment: Payment) => {
    if (!buyer || !seller || !items || !payment) {
        // console.error('Missing data fields: ', { buyer, seller, items, payment });
        return false;
    }
    if (items.length === 0) {
        // console.error('Items array is empty');
        return false;
    }

    for (const item of items) {
        if (typeof item.itemPrice !== 'number' || item.itemPrice <= 0) {
            // console.error(`Invalid itemPrice for item: ${JSON.stringify(item)}`);
            return false;
        }
        if (typeof item.itemQuantity !== 'number' || item.itemQuantity <= 0) {
            // console.error(`Invalid itemQuantity for item: ${JSON.stringify(item)}`);
            return false;
        }
    }

    return true;
};

// Function to Convert JSON Order to UBL XML
export const convertToUBLXML = async (order: Order): Promise<string> => {
    const builder = new xml2js.Builder({ rootName: "Order" });
    return builder.buildObject(order);
};

// JSON to XML conversion
export const JSONToXML = (json: any): string => {
    return `<order>${JSON.stringify(json)}</order>`;
};