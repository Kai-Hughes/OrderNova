"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.orderFetchSingleOrder = exports.updateOrder = exports.createUBLOrder = exports.createOrder = void 0;
const database_1 = require("./database");
const helper_1 = require("./helper");
const nanoid_1 = require("nanoid");
// import { create } from 'xmlbuilder2';
const js2xmlparser_1 = require("js2xmlparser");
// Function to Create an Order
const createOrder = async (userId, buyer, seller, items, payment) => {
    if (!(0, helper_1.isOrderDataValid)(buyer, seller, items, payment)) {
        throw new Error("Incorrect data-field");
    }
    // Generate Order Object
    const newOrder = {
        orderId: (0, nanoid_1.nanoid)(),
        userId,
        buyer,
        seller,
        items,
        payment,
        timestamp: new Date().toISOString(),
    };
    // Convert to UBL XML
    const xmlOrder = await (0, helper_1.convertToUBLXML)(newOrder);
    await (0, database_1.DBaddUBLDoc)(userId, xmlOrder, Date.now(), Date.now(), newOrder.orderId);
    return { orderId: newOrder.orderId };
};
exports.createOrder = createOrder;
const createUBLOrder = async (userId, buyer, seller, items, payment) => {
    if (!(0, helper_1.isOrderDataValid)(buyer, seller, items, payment)) {
        throw new Error("Incorrect data-field");
    }
    // Generate Order Object
    const newOrder = {
        orderId: (0, nanoid_1.nanoid)(),
        userId,
        buyer,
        seller,
        items,
        payment,
        timestamp: new Date().toISOString(),
    };
    // Convert to UBL XML
    const xmlOrder = await (0, helper_1.convertToUBLXML)(newOrder);
    await (0, database_1.DBaddUBLDoc)(userId, xmlOrder, Date.now(), Date.now(), newOrder.orderId);
    return { orderId: newOrder.orderId };
};
exports.createUBLOrder = createUBLOrder;
const updateOrder = async (orderId, updatedFields) => {
    const existingOrder = await (0, database_1.DBgetOrder)(orderId);
    if (!existingOrder) {
        throw { status: 400, message: "Invalid orderId" };
    }
    const updatedOrder = { ...existingOrder, ...updatedFields };
    const updatedXML = (0, js2xmlparser_1.parse)("Order", updatedOrder);
    await (0, database_1.DBupdateUBLDoc)(orderId, updatedXML, Date.now());
    return updatedXML;
};
exports.updateOrder = updateOrder;
const orderFetchSingleOrder = async (userId, orderId) => {
    const doc = await (0, database_1.DBgetDoc)(orderId);
    if (doc.userid !== userId) {
        throw new Error("Unauthorized");
    }
    return doc.filecontents;
};
exports.orderFetchSingleOrder = orderFetchSingleOrder;
// Function to delete an order
const deleteOrder = async (userId, orderId) => {
    // Get all orders for this user.
    const docs = await (0, database_1.DBgetUBLDocs)(userId);
    //   console.log("Existing Orders:", docs);
    // Check that one of the orders has a matching orderId.
    const exists = docs.some(doc => doc.orderId === orderId);
    if (!exists) {
        throw new Error("Invalid orderId");
    }
    // Delete the order by orderId.
    await (0, database_1.DBremoveOrder)(orderId);
    return orderId;
};
exports.deleteOrder = deleteOrder;
// export const createUBLOrder = async (userId: string, buyer: Buyer, seller: Seller, items: Item[], payment: Payment) => {
//   if (!isOrderDataValid(buyer, seller, items, payment)) {
//       throw new Error("Incorrect data-field");
//   }
//   // Generate Order Object
//   const newOrder: Order = {
//       orderId: nanoid(),
//       userId,
//       buyer,
//       seller,
//       items,
//       payment,
//       timestamp: new Date().toISOString(),
//   };
//   // Convert to UBL XML
//   const xmlOrder = await convertToUBLXML(newOrder);
//   await DBaddUBLDoc(userId, xmlOrder, Date.now(), Date.now(), newOrder.orderId);
//   return { orderId: newOrder.orderId };
// };
// const createOrderUBL = (orderId: string, payment: Payment, items: Item[], seller: Seller, buyer: Buyer) => {
//   const xml = create({ version: '1.0', encoding: 'UTF-8' })
//       .ele('Order', {
//           xmlns: 'urn:oasis:names:specification:ubl:schema:xsd:Order-2',
//           'xmlns:cbc': 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
//           'xmlns:cac': 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2'
//       })
//       .ele('cbc:ID', orderId)
//       .up()
//       .ele('cbc:IssueDate', new Date().toISOString().split('T')[0])
//       .up()
//       .ele('cac:OrderingParty')
//       .ele('cbc:Name', buyer.buyerName)
//       .up()
//       .up()
//       .ele('cac:SellerSupplierParty')
//       .ele('cbc:Name', seller.sellerName)
//       .up()
//       .up()
//       .ele('cac:PaymentMeans')
//       .ele('cbc:PaymentDueDate', payment.dueDate)
//       .up()
//       .ele('cbc:PaymentID', payment.paymentId)
//       .up()
//       .up()
//       .ele('cac:LegalMonetaryTotal')
//       .ele('cbc:PayableAmount', { currencyID: payment.currency }, payment.amount)
//       .up()
//       .up()
//       // Map over items and create multiple OrderLine elements
//       .ele('cac:OrderLines')
//       .ele('cac:OrderLine', items.map((item, index) => 
//           create('cac:OrderLine')
//               .ele('cbc:ID', String(index + 1))
//               .up()
//               .ele('cbc:Name', item.name)
//               .up()
//               .ele('cbc:Quantity', { unitCode: 'EA' }, item.quantity)
//               .up()
//               .ele('cbc:PriceAmount', { currencyID: payment.currency }, item.price)
//               .up()
//       ))
//       .up()
//       .end({ prettyPrint: true });
//   return xml;
// };
