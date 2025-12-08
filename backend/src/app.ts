import express, { Request, Response } from 'express'; 
import cors from "cors";
import { DBConnect, DBsetup } from './database';
const path = require("path");
export const app = express();
export const secretKey = 'key';
import signupRoute from './signup';
import loginRoute from './login';
import logoutRoute from './logout';
import swaggerRoute from './swagger';
import createRoute from './orderCreate';
import updateRoute from './orderUpdate';
import fetchRoute from './orderFetch';
import fetchAllRoute from './orderFetchAll';
import deleteRoute from './orderDelete';
import healthRoute from './health';
import generateInvoiceRoute from './invoiceGenerate';
import fetchInvoiceRoute from './invoiceFetch';
import deleteInvoiceRoute from './invoiceDelete';
import updateInvoiceRoute from './invoiceUpdate';
import validateInvoiceRoute from './invoiceValidate';
import analyticsRoute from './analytics';
import bulkCreateRoute from './bulkOrderCreate';
import { otherAPIAuth } from './externalAuth';

DBsetup();
DBConnect();

const port = process.env.PORT || 3030

export const sessionMap: Record<string, boolean> = {};
// export const server = app.listen(port, () => {
//     console.log(`🚀 Server is running at http://localhost:3030`);
// });

app.use(express.json());
app.use(cors(
    {
    origin: '*', // This allows all origins, adjust as needed for security
    methods: 'GET,POST,PUT,DELETE', // Adjust allowed methods as necessary
    }
));
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, '../public')));
app.use(signupRoute);
app.use(loginRoute);
app.use(logoutRoute);
app.use(swaggerRoute);
app.use(createRoute);
app.use(updateRoute);
app.use(fetchRoute);
app.use(fetchAllRoute);
app.use(deleteRoute);
app.use(healthRoute);
app.use(generateInvoiceRoute);
app.use(fetchInvoiceRoute);
app.use(deleteInvoiceRoute);
app.use(validateInvoiceRoute);
app.use(updateInvoiceRoute);
app.use(analyticsRoute);
app.use(bulkCreateRoute);

// Sanity Check
app.get('/test', (req: Request, res: Response) => {
    return res.status(200).send({message: "That'll do it"});
});

export default app;



