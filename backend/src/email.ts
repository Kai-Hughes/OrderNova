import nodemailer from 'nodemailer';
import path from "path";


const EMAIL = "OrderCreationAPI@gmail.com";
const PASS = "bofx dqgv rdym yfvi";

export const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use your preferred service like Gmail, SendGrid, etc.
    auth: {
        user: EMAIL, // your email
        pass: PASS, // your email password or an app-specific password
    },
});

export async function createSignupEmail(recipientName: string, recipientEmail: string, fullUrl: string) {
    
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
            path: path.join(__dirname, '/img/working.png'), // Path to the image file in your local directory
            cid: 'logo', // This matches the cid referenced in the html img tag
          },
        ],
      };

    return mailOptions;
}


export async function createOrderEmail(buyerEmail: string, xmlString: string) {
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
            path: path.join(__dirname, '/img/booking.png'), // Path to the image file in your local directory
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



export async function updateOrderMail(buyerEmail: string, xmlString: string) {
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
            path: path.join(__dirname, '/img/shipping.png'), // Path to the image file in your local directory
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


export async function deleteOrderMail(buyerEmail: string) {
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
          path: path.join(__dirname, '/img/failed.png'), // Path to the image file in your local directory
          cid: 'logo', // This matches the cid referenced in the html img tag
        }
      ],
    };

  return mailOptions;
}