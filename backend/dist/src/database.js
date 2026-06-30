"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBDisconnect = DBDisconnect;
exports.DBclear = DBclear;
exports.DBempty = DBempty;
exports.DBsetup = DBsetup;
exports.DBaddUser = DBaddUser;
exports.DBremoveUser = DBremoveUser;
exports.DBgetUserInfo = DBgetUserInfo;
exports.DBgetUserId = DBgetUserId;
exports.DBaddUBLDoc = DBaddUBLDoc;
exports.DBremoveUBLDoc = DBremoveUBLDoc;
exports.DBlistUserUBLDocs = DBlistUserUBLDocs;
exports.DBgetDoc = DBgetDoc;
exports.DBgetOrder = DBgetOrder;
exports.DBupdateUBLDoc = DBupdateUBLDoc;
exports.DBgetUBLDocs = DBgetUBLDocs;
exports.DBremoveOrder = DBremoveOrder;
const pg_1 = __importDefault(require("pg"));
const Errors_1 = require("./Errors");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const DB_END_POINT = process.env.DATABASE_URL || `localhost`
// const DB_PORT = Number(process.env.PGPORT) || 5432
// const DB_USER_NAME = process.env.PGUSER || `ordernova_user`
// const DB_NAME = process.env.PGNAME || `ordernova_db`
// const DB_PASSWORD = process.env.PGPASSWORD || `ordernova_pw`
const { Pool } = pg_1.default;
const databaseUrl = process.env.DATABASE_URL ?? process.env.PUBLIC_DB_URL;
console.log(databaseUrl);
const pool = new Pool({
    connectionString: databaseUrl,
    ssl: databaseUrl ? { rejectUnauthorized: false } : false
});
/**
 * Connects to psql database. Run this before trying other DB functions.
 */
// LEGACY: replaced by pool for concurrency issues
// export async function DBConnect() {
//     await client.connect();
// }
/**
 * Disconnect from psql database. Run this after using database.
 */
async function DBDisconnect() {
    await pool.end();
}
/**
 * Clears the database completely. Caution: Removes all database data.
 */
async function DBclear() {
    // await client.query(
    //     `drop table if exists invoices;`);
    await pool.query(`drop table if exists ubldocs;`);
    await pool.query(`drop table if exists users;`);
}
async function DBempty() {
    // await client.query(
    //     'delete from invoices'
    // );
    await pool.query('delete from ubldocs');
    await pool.query('delete from users');
}
/**
 * Adds the tables users, and ubdocs to the database.
 */
async function DBsetup() {
    await pool.query(`create table if not exists users(
        userId text primary key,
        userEmail text not null unique,
        name text,
        phone text unique,
        password text not null);`);
    await pool.query(`create table if not exists ubldocs(
        orderId text primary key,
        userId text references users(userId),
        fileContents text,
        dateAdded bigint not null,
        dateLastModified bigint not null);`);
    // await client.query(
    //     `create table if not exists invoices(
    //     invoiceId text primary key,
    //     orderId text references ubldocs(orderId),
    //     userId text references users(userId),
    //     fileContents text);`
    // );
}
/**
 * Adds a user to the database table users.
 * @param userId
 * @param userEmail - Must be unique.
 * @param name
 * @param phone
 * @param password  - Use hashed passwords for security.
 */
async function DBaddUser(userId, userEmail, name, phone, password) {
    await pool.query(`insert into users(userId, userEmail, name, phone, password) values
        ('${userId}', '${userEmail}', '${name}', '${phone}', '${password}');`);
}
/**
 * Removes user from database table users.
 * @param userId
 */
async function DBremoveUser(userId) {
    await pool.query(`delete from users u where u.userId = '${userId};'`);
}
/**
 * Returns the user details of the user in the database table users.
 * @param userId
 * @returns
 */
async function DBgetUserInfo(userId) {
    const ret = await pool.query(`select * from users u where u.userId = '${userId}';`);
    if (ret.rows.length <= 0) {
        throw new Errors_1.InvalidInfo(`User does not exist in DB!`);
    }
    return new Promise((resolve) => {
        resolve(ret.rows[0]);
    });
}
/**
 * Returns the userid of the user in the database table users.
 * @param userEmail
 * @returns
 */
async function DBgetUserId(userEmail) {
    const ret = await pool.query(`select userid from users u where u.userEmail = '${userEmail}';`);
    return new Promise((resolve) => {
        resolve(ret.rows[0]);
    });
}
/**
 * Adds a UBL doc the database table ubldocs.
 * @param userId - Must correspond to a user's id in the database.
 * @param fileContents
 * @param dateAdded
 * @param dateLastModified
 */
async function DBaddUBLDoc(userId, fileContents, dateAdded, dateLastModified, orderId) {
    await pool.query(`insert into ubldocs(orderid, userId, fileContents, dateAdded, 
        dateLastModified) values
        ('${orderId}', '${userId}', '${fileContents}', ${dateAdded}, ${dateLastModified});`);
}
/**
 * Remove a ubl doc from the database tabel ubldocs.
 * @param orderId - orderId of the ubl doc being removed.
 */
async function DBremoveUBLDoc(orderId) {
    await pool.query(`delete from ubldocs u where u.orderId = '${orderId}';`);
}
/**
 * Return a list of order ids corresponding to the ubl docs stored in a database
 * which are owned by a user from the database.
 * @param userId
 * @returns
 */
async function DBlistUserUBLDocs(userId) {
    const res = await pool.query(`select orderId from ubldocs u where u.userId = '${userId}';`);
    return new Promise((resolve) => {
        resolve(res.rows);
    });
}
/**
 * Return the information of a document in the database table ubldocs.
 * @param orderId
 * @returns
 */
async function DBgetDoc(orderId) {
    const res = await pool.query(`select * from ubldocs u where u.orderId = '${orderId}';`);
    if (res.rowCount == 0 || res.rowCount == null) {
        throw new Error(`Invalid orderId`);
    }
    let ret = {
        orderid: res.rows[0].orderid,
        userid: res.rows[0].userid,
        filecontents: res.rows[0].filecontents,
        dateadded: parseInt(res.rows[0].dateadded),
        datelastmodified: parseInt(res.rows[0].datelastmodified)
    };
    return new Promise((resolve) => {
        resolve(ret);
    });
}
async function DBgetOrder(orderId) {
    const res = await pool.query(`SELECT * FROM ubldocs WHERE orderid = $1;`, [orderId]);
    if (res.rowCount === 0) {
        throw new Error(`noResults`);
    }
    const row = res.rows[0];
    return {
        orderid: row.orderid,
        userid: row.userid,
        buyer: row.buyer,
        seller: row.seller,
        items: row.items,
        payment: row.payment,
        timestamp: Date.now().toString()
    };
}
async function DBupdateUBLDoc(orderId, fileContents, dateLastModified) {
    const res = await pool.query(`UPDATE ubldocs 
        SET fileContents = $1, dateLastModified = $2 
        WHERE orderId = $3`, [fileContents, dateLastModified, orderId]);
    if (res.rowCount == 0 || res.rowCount == null) {
        throw Error(`No valid document to update`);
    }
}
/**
 * Return all docs belonging to a user. We can check if a given fileId belongs to that user.
 */
async function DBgetUBLDocs(userId) {
    const res = await pool.query(`SELECT orderId, fileContents, dateAdded, dateLastModified FROM ubldocs WHERE userId = '${userId}';`);
    return res.rows.map(row => ({
        orderId: row.orderid,
        fileContents: row.filecontents,
        dateAdded: parseInt(row.dateadded),
        dateLastModified: parseInt(row.datelastmodified)
    }));
}
async function DBremoveOrder(orderId) {
    await pool.query(`DELETE FROM ubldocs WHERE orderId = $1;`, [orderId]);
}
/**
 *  THIS IS FOR ALL THE INVOICE STUFF
 */
// export async function DBaddInvoice(invoiceId: string, orderId: string, userId: string, fileContents: string) {
//     await client.query(
//         `INSERT INTO invoices(invoiceId, orderId, userId, fileContents) VALUES
//         ('${invoiceId}', '${orderId}', '${userId}', '${fileContents}');`
//     );
// }
// export async function DBupdateInvoice(fileContents: string, orderId: string) {
//     const res = await client.query(
//         `UPDATE invoices
//          SET fileContents = $1
//          WHERE orderId = $2
//          RETURNING invoiceId;`,
//         [fileContents, orderId]
//     );
//     if (res.rowCount === 0) {
//         throw new Error(`No invoice found with orderId: ${orderId}`);
//     }
// }
// export async function DBgetInvoicesByUser(userId: string) {
//     const res = await client.query(
//         `SELECT * FROM invoices WHERE userId = $1;`,
//         [userId]
//     );
//     if (res.rowCount === 0) {
//         throw new Error(`No invoices found for userId: ${userId}`);
//     }
//     return res.rows; // Returns an array of invoice objects
// }
// export async function DBgetInvoiceByOrderId(orderId: string) {
//     const res = await client.query(
//         `SELECT * FROM invoices WHERE orderId = $1;`,
//         [orderId]
//     );
//     if (res.rowCount === 0) {
//         throw new Error(`No invoices found for orderId: ${orderId}`);
//     }
//     return res.rows; // Returns an array of invoice objects for the given orderId
// }
// export async function DBdeleteInvoice(invoiceId: string) {
//     const res = await client.query(
//         `DELETE FROM invoices WHERE invoiceId = $1 RETURNING invoiceId;`,
//         [invoiceId]
//     );
//     if (res.rowCount === 0) {
//         throw new Error(`No invoice found with invoiceId: ${invoiceId}`);
//     }
//     console.log(`Invoice with invoiceId: ${invoiceId} deleted successfully`);
// }
