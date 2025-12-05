
import pg, { DatabaseError } from 'pg'
import { Order,Seller,Item,Payment,Buyer } from './object'
import { InvalidInfo } from './Errors'

const DB_END_POINT = `localhost`
const DB_PORT = 5432
const DB_USER_NAME = `ordernova_user`
const DB_NAME = `ordernova_db`
const DB_PASSWORD = `ordernova_pw`

const { Client } = pg
const client = new Client({
    user: DB_USER_NAME,
    password: DB_PASSWORD,
    host: DB_END_POINT,
    port: DB_PORT,
    database: DB_NAME
})


/**
 * Connects to psql database. Run this before trying other DB functions.
 */
export async function DBConnect() {
    await client.connect();
}

/**
 * Disconnect from psql database. Run this after using database.
 */
export async function DBDisconnect() {
    await client.end();
}

/**
 * Clears the database completely. Caution: Removes all database data.
 */
export async function DBclear() {
    // await client.query(
    //     `drop table if exists invoices;`);
    await client.query(
        `drop table if exists ubldocs;`);
    await client.query(
        `drop table if exists users;`);
}

export async function DBempty() {
    // await client.query(
    //     'delete from invoices'
    // );
    await client.query(
        'delete from ubldocs'
    );
    await client.query(
        'delete from users'
    );
}

/**
 * Adds the tables users, and ubdocs to the database.
 */
export async function DBsetup() {
    await client.query(
        `create table if not exists users(
        userId text primary key,
        userEmail text not null unique,
        name text,
        phone text unique,
        password text not null);`);


    await client.query(
        `create table if not exists ubldocs(
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
export async function DBaddUser(userId: string, userEmail: String,
    name: String, phone: String, password: String) {
    await client.query(
        `insert into users(userId, userEmail, name, phone, password) values
        ('${userId}', '${userEmail}', '${name}', '${phone}', '${password}');`);
}

/**
 * Removes user from database table users.
 * @param userId 
 */
export async function DBremoveUser(userId: string) {
    await client.query(
        `delete from users u where u.userId = '${userId};'`);
}

/**
 * Returns the user details of the user in the database table users.
 * @param userId 
 * @returns 
 */
export async function DBgetUserInfo(userId: String):
    Promise<{
        userid: String, useremail: String, name: String, phone: String,
        password: String
    }> {
    const ret = await client.query(
        `select * from users u where u.userId = '${userId}';`);

    if (ret.rows.length <= 0) {
        throw new InvalidInfo(`User does not exist in DB!`)
    }

    return new Promise((resolve) => {
        resolve(ret.rows[0])
    });
}

/**
 * Returns the userid of the user in the database table users.
 * @param userEmail 
 * @returns 
 */
export async function DBgetUserId(userEmail: String):
    Promise<{ userid: String }> {
    const ret = await client.query(
        `select userid from users u where u.userEmail = '${userEmail}';`);

    return new Promise((resolve) => {
        resolve(ret.rows[0])
    });
}

/**
 * Adds a UBL doc the database table ubldocs.  
 * @param userId - Must correspond to a user's id in the database.
 * @param fileContents 
 * @param dateAdded 
 * @param dateLastModified 
 */
export async function DBaddUBLDoc(userId: String, fileContents: String,
    dateAdded: Number, dateLastModified: Number, orderId: String) {
    await client.query(
        `insert into ubldocs(orderid, userId, fileContents, dateAdded, 
        dateLastModified) values
        ('${orderId}', '${userId}', '${fileContents}', ${dateAdded}, ${dateLastModified});`);
}

/**
 * Remove a ubl doc from the database tabel ubldocs.
 * @param orderId - orderId of the ubl doc being removed.
 */
export async function DBremoveUBLDoc(orderId: String) {
    await client.query(
        `delete from ubldocs u where u.orderId = '${orderId}';`);
}

/**
 * Return a list of order ids corresponding to the ubl docs stored in a database
 * which are owned by a user from the database.
 * @param userId 
 * @returns
 */
export async function DBlistUserUBLDocs(userId: String):
    Promise<{ orderId: String }[]> {
    const res = await client.query(
        `select orderId from ubldocs u where u.userId = '${userId}';`);

    return new Promise((resolve) => {
        resolve(res.rows)
    });
}

/**
 * Return the information of a document in the database table ubldocs.
 * @param orderId 
 * @returns 
 */
export async function DBgetDoc(orderId: String):
    Promise<{
        orderid: String, userid: String,
        filecontents: String, dateadded: Number, datelastmodified: Number
    }> {
    const res = await client.query(
        `select * from ubldocs u where u.orderId = '${orderId}';`);
    
    if (res.rowCount == 0 || res.rowCount == null) {
        throw new Error(`Invalid orderId`)
    }

    let ret = {
        orderid: res.rows[0].orderid, 
        userid: res.rows[0].userid,
        filecontents: res.rows[0].filecontents,
        dateadded: parseInt(res.rows[0].dateadded), 
        datelastmodified: parseInt(res.rows[0].datelastmodified)};

    return new Promise((resolve) => {
        resolve(ret)
    });
}

export async function DBgetOrder(orderId: string): Promise<{
    orderid: string;
    userid: string;
    buyer: Buyer;
    seller: Seller;
    items: Item[];
    payment: Payment;
    timestamp: string;
}> {
    const res = await client.query(
        `SELECT * FROM ubldocs WHERE orderid = $1;`, [orderId]
    );

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

export async function DBupdateUBLDoc( orderId: string,
    fileContents: string, dateLastModified: Number
) {
    const res = await client.query(
        `UPDATE ubldocs 
        SET fileContents = $1, dateLastModified = $2 
        WHERE orderId = $3`,
        [fileContents, dateLastModified, orderId]
        );

    if (res.rowCount == 0 || res.rowCount == null) {
        throw Error(`No valid document to update`);
    }
}

/**
 * Return all docs belonging to a user. We can check if a given fileId belongs to that user.
 */
export async function DBgetUBLDocs(userId: string): Promise<{ orderId: string, fileContents: string, dateAdded: number, dateLastModified: number }[]> {
    const res = await client.query(
      `SELECT orderId, fileContents, dateAdded, dateLastModified FROM ubldocs WHERE userId = '${userId}';`
    );
    return res.rows.map(row => ({
      orderId: row.orderid,
      fileContents: row.filecontents,
      dateAdded: parseInt(row.dateadded),
      dateLastModified: parseInt(row.datelastmodified)
    }));
  }

  export async function DBremoveOrder(orderId: string) {
    await client.query(
      `DELETE FROM ubldocs WHERE orderId = $1;`,
      [orderId]
    );
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



