"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
exports.createSignupEmail = createSignupEmail;
exports.createOrderEmail = createOrderEmail;
exports.updateOrderMail = updateOrderMail;
exports.deleteOrderMail = deleteOrderMail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const EMAIL = "OrderCreationAPI@gmail.com";
const PASS = "bofx dqgv rdym yfvi";
exports.transporter = nodemailer_1.default.createTransport({
    service: 'gmail', // You can use your preferred service like Gmail, SendGrid, etc.
    auth: {
        user: EMAIL, // your email
        pass: PASS, // your email password or an app-specific password
    },
});
async function createSignupEmail(recipientName, recipientEmail, fullUrl) {
    const subject = `Welcome, ${recipientName}!`;
    const htmlContent = `<h1>Thank You For Creating An Account With Us</h1>
          <p>Welcome to our order generation service ${recipientName}, now that you've made an account please login to our site! ${fullUrl}</p>
          <img src="cid:logo" width="100" height="100" />`;
    // Define the mail options dynamically using the recipient's details
    const mailOptions = {
        from: 'ordercreationAPI@gmail.com',
        to: recipientEmail, // come back to this and have it include any orders e.t.c
        subject: subject,
        html: htmlContent,
        attachments: [
            {
                filename: "working.png",
                path: path_1.default.join(__dirname, '/img/working.png'), // Path to the image file in your local directory
                cid: 'logo', // This matches the cid referenced in the html img tag
            },
        ],
    };
    return mailOptions;
}
async function createOrderEmail(buyerEmail, xmlString) {
    // console.log(buyerEmail, sellerEmail);
    const buyerSubject = `Order Successful, ${buyerEmail}!`;
    const htmlContent = `<h1>Your Order Has Been Made</h1>
          <p>Want to view your order's details? view the attatched xml order file for more details.</p>
          <img src="cid:logo" width="100" height="100" />`;
    // Define the mail options dynamically using the recipient's details
    const mailOptions = {
        from: 'ordercreationAPI@gmail.com',
        to: buyerEmail, // come back to this and have it include any orders e.t.c
        subject: buyerSubject,
        html: htmlContent,
        attachments: [
            {
                filename: "booking.png",
                path: path_1.default.join(__dirname, '/img/booking.png'), // Path to the image file in your local directory
                cid: 'logo', // This matches the cid referenced in the html img tag
            },
            {
                filename: `YourOrder.xml`,
                content: Buffer.from(xmlString, 'utf-8'),
                contentType: 'application/xml'
            }
        ],
    };
    return mailOptions;
}
async function updateOrderMail(buyerEmail, xmlString) {
    // console.log(buyerEmail, sellerEmail);
    const buyerSubject = `Order Update Successful, ${buyerEmail}!`;
    const htmlContent = `<h1>We've Updated Your Order</h1>
          <p>View your updated order's details!</p>
          <img src="cid:logo" width="100" height="100" />`;
    // Define the mail options dynamically using the recipient's details
    const mailOptions = {
        from: 'ordercreationAPI@gmail.com',
        to: buyerEmail, // come back to this and have it include any orders e.t.c
        subject: buyerSubject,
        html: htmlContent,
        attachments: [
            {
                filename: "shipping.png",
                path: path_1.default.join(__dirname, '/img/shipping.png'), // Path to the image file in your local directory
                cid: 'logo', // This matches the cid referenced in the html img tag
            },
            {
                filename: `YourOrder.xml`,
                content: Buffer.from(xmlString, 'utf-8'),
                contentType: 'application/xml'
            }
        ],
    };
    return mailOptions;
}
async function deleteOrderMail(buyerEmail) {
    // console.log(buyerEmail, sellerEmail);
    const buyerSubject = `Order Cancelled Successfully, ${buyerEmail}!`;
    const htmlContent = `<h1>We've Cancelled Your Order</h1>
        <p>View your updated order's details!</p>
        <img src="cid:logo" width="100" height="100" />`;
    // Define the mail options dynamically using the recipient's details
    const mailOptions = {
        from: 'ordercreationAPI@gmail.com',
        to: buyerEmail, // come back to this and have it include any orders e.t.c
        subject: buyerSubject,
        html: htmlContent,
        attachments: [
            {
                filename: "failed.png",
                path: path_1.default.join(__dirname, '/img/failed.png'), // Path to the image file in your local directory
                cid: 'logo', // This matches the cid referenced in the html img tag
            }
        ],
    };
    return mailOptions;
}
