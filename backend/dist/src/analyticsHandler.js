"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthlyCosts = getMonthlyCosts;
exports.getOrdersByDay = getOrdersByDay;
exports.getTopProductCategories = getTopProductCategories;
exports.getAverageOrderValue = getAverageOrderValue;
const xml2js_1 = require("xml2js");
const database_1 = require("./database");
const date_fns_1 = require("date-fns");
const Errors_1 = require("./Errors");
async function getMonthlyCosts(userId, startDate, endDate) {
    if (!startDate || !endDate) {
        throw new Errors_1.InvalidInfo("startDate and endDate queries not supplied!");
    }
    const analytics = [];
    const orders = await (0, database_1.DBgetUBLDocs)(userId);
    for (let curr = new Date(startDate); curr <= new Date(endDate); curr = (0, date_fns_1.addMonths)(curr, 1)) {
        let sum = 0;
        for (let order of orders) {
            try {
                const result = await (0, xml2js_1.parseStringPromise)(order.fileContents);
                if ((0, date_fns_1.isSameMonth)(new Date(result.Order.timestamp[0]), curr)) {
                    sum += result.Order.items.reduce((acc, cur) => acc + parseFloat(cur.itemQuantity[0]) * parseFloat(cur.itemPrice[0]), 0);
                }
            }
            catch (err) {
                console.error("Error parsing XML in getMonthlyCosts:", err);
            }
        }
        analytics.push({ year: (0, date_fns_1.getYear)(curr), month: (0, date_fns_1.format)(curr, "MMM"), cost: sum });
    }
    return analytics;
}
async function getOrdersByDay(userId) {
    const orders = await (0, database_1.DBgetUBLDocs)(userId);
    const now = new Date();
    const dailyCount = {};
    for (let order of orders) {
        try {
            const result = await (0, xml2js_1.parseStringPromise)(order.fileContents);
            const timestamp = new Date(result.Order.timestamp[0]);
            if ((0, date_fns_1.isSameMonth)(timestamp, now)) {
                const dayLabel = (0, date_fns_1.format)(timestamp, "MMM dd");
                dailyCount[dayLabel] = (dailyCount[dayLabel] || 0) + 1;
            }
        }
        catch (err) {
            console.error("Error parsing XML in getOrdersByDay:", err);
        }
    }
    return Object.entries(dailyCount)
        .map(([day, total]) => ({ day, total }))
        .sort((a, b) => parseInt(a.day.split(' ')[1]) - parseInt(b.day.split(' ')[1]));
}
async function getTopProductCategories(userId) {
    const orders = await (0, database_1.DBgetUBLDocs)(userId);
    const now = new Date();
    const categoryMap = {};
    for (let order of orders) {
        try {
            const result = await (0, xml2js_1.parseStringPromise)(order.fileContents);
            if ((0, date_fns_1.isSameMonth)(new Date(result.Order.timestamp[0]), now)) {
                for (let item of result.Order.items) {
                    const description = item.itemDescription?.[0] || 'Unknown';
                    categoryMap[description] = (categoryMap[description] || 0) + 1;
                }
            }
        }
        catch (err) {
            console.error("Error parsing XML in getTopProductCategories:", err);
        }
    }
    // Return every category found, not just the top 5 -- callers (e.g. the
    // pie chart) can decide their own display limit, but the underlying
    // data shouldn't be silently truncated server-side.
    return Object.entries(categoryMap)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count);
}
async function getAverageOrderValue(userId) {
    const orders = await (0, database_1.DBgetUBLDocs)(userId);
    const now = new Date();
    let totalValue = 0;
    let count = 0;
    for (const order of orders) {
        try {
            const result = await (0, xml2js_1.parseStringPromise)(order.fileContents);
            if ((0, date_fns_1.isSameMonth)(new Date(result.Order.timestamp[0]), now)) {
                const value = result.Order.items.reduce((acc, cur) => acc + parseFloat(cur.itemQuantity[0]) * parseFloat(cur.itemPrice[0]), 0);
                totalValue += value;
                count++;
            }
        }
        catch (err) {
            console.error("Error parsing XML in getAverageOrderValue:", err);
        }
    }
    return count > 0 ? totalValue / count : 0;
}
