import { DBaddUBLDoc, DBgetUserInfo, DBlistUserUBLDocs, DBgetDoc, DBgetUBLDocs, DBremoveOrder , DBupdateUBLDoc, DBgetOrder} from "./database";
import { Order, Buyer, Seller, Item, Payment } from "./object";
import { isOrderDataValid, convertToUBLXML, JSONToXML } from "./helper";
import { nanoid } from "nanoid";
// import { create } from 'xmlbuilder2';
import { parse } from "js2xmlparser";


// Function to Create an Order
export const createOrder = async (userId: string, buyer: Buyer, seller: Seller, items: Item[], payment: Payment) => {
    if (!isOrderDataValid(buyer, seller, items, payment)) {
        throw new Error("Incorrect data-field");
    }

    // Generate Order Object
    const newOrder: Order = {
        orderId: nanoid(),
        userId,
        buyer,
        seller,
        items,
        payment,
        timestamp: new Date().toISOString(),
    };

    // Convert to UBL XML
    const xmlOrder = await convertToUBLXML(newOrder);


    await DBaddUBLDoc(userId, xmlOrder, Date.now(), Date.now(), newOrder.orderId);

    return { orderId: newOrder.orderId };
};



export const createUBLOrder = async (userId: string, buyer: Buyer, seller: Seller, items: Item[], payment: Payment) => {
  if (!isOrderDataValid(buyer, seller, items, payment)) {
      throw new Error("Incorrect data-field");
  }

  // Generate Order Object
  const newOrder: Order = {
      orderId: nanoid(),
      userId,
      buyer,
      seller,
      items,
      payment,
      timestamp: new Date().toISOString(),
  };

  // Convert to UBL XML
  const xmlOrder = await convertToUBLXML(newOrder);


  await DBaddUBLDoc(userId, xmlOrder, Date.now(), Date.now(), newOrder.orderId);

  return { orderId: newOrder.orderId };
};











export const updateOrder = async (orderId: string, updatedFields: Partial<Order>) => {
  const existingOrder = await DBgetOrder(orderId);
  if (!existingOrder) {
      throw { status: 400, message: "Invalid orderId" };
  }

  const updatedOrder = { ...existingOrder, ...updatedFields };
  const updatedXML = parse("Order", updatedOrder);

  await DBupdateUBLDoc(orderId, updatedXML, Date.now());

  return updatedXML;
};



export const orderFetchSingleOrder = async (userId: string, orderId: string) => {

        const doc = await DBgetDoc(orderId); 

        if (doc.userid !== userId) {
            throw new Error("Unauthorized");
        }

        return doc.filecontents;
};


// Function to delete an order
export const deleteOrder = async (userId: string, orderId: string): Promise<string> => {
  // Get all orders for this user.
  const docs = await DBgetUBLDocs(userId);
//   console.log("Existing Orders:", docs);
  // Check that one of the orders has a matching orderId.
  const exists = docs.some(doc => doc.orderId === orderId);
  if (!exists) {
    throw new Error("Invalid orderId");
  }
  // Delete the order by orderId.
  await DBremoveOrder(orderId);
  return orderId;
};





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