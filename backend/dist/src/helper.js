"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONToXML = exports.convertToUBLXML = exports.isOrderDataValid = void 0;
const xml2js_1 = __importDefault(require("xml2js"));
// Function to Validate Order Data
const isOrderDataValid = (buyer, seller, items, payment) => {
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
exports.isOrderDataValid = isOrderDataValid;
// Function to Convert JSON Order to UBL XML
const convertToUBLXML = async (order) => {
    const builder = new xml2js_1.default.Builder({ rootName: "Order" });
    return builder.buildObject(order);
};
exports.convertToUBLXML = convertToUBLXML;
// JSON to XML conversion
const JSONToXML = (json) => {
    return `<order>${JSON.stringify(json)}</order>`;
};
exports.JSONToXML = JSONToXML;
