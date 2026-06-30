import { parseStringPromise } from "xml2js";
import { DBgetUBLDocs } from "./database";
import { getDate, addMonths, format, getYear, isSameMonth, startOfMonth } from "date-fns";
import { monthlyCost } from "./object";
import { InvalidInfo } from "./Errors";

// All analytics "month" comparisons below need to reflect the user's local
// calendar, not the server's. Timestamps are stored in UTC (new Date().toISOString()),
// and the server itself runs in UTC (Railway containers default to UTC) --
// so comparing raw UTC timestamps with isSameMonth means any order placed
// between midnight and 10/11am Australian local time gets silently bucketed
// into the PREVIOUS month, since UTC is still on the prior calendar day at
// that point. Shifting both sides of every comparison by the same fixed
// offset before comparing keeps "month" consistent with what an
// Australia-based user actually means by "this month".
const AU_OFFSET_HOURS = 10; // AEST. Use 11 if you want to account for AEDT.

function toLocalAU(date: Date): Date {
    return new Date(date.getTime() + AU_OFFSET_HOURS * 60 * 60 * 1000);
}

export async function getMonthlyCosts(userId: string, startDate: string, endDate: string): Promise<monthlyCost[]> {
    if (!startDate || !endDate) {
        throw new InvalidInfo("startDate and endDate queries not supplied!");
    }

    const analytics: monthlyCost[] = [];
    const orders = await DBgetUBLDocs(userId);

    for (let curr = new Date(startDate); curr <= new Date(endDate); curr = addMonths(curr, 1)) {
        let sum = 0;
        for (let order of orders) {
            try {
                const result = await parseStringPromise(order.fileContents);
                const orderTimestamp = toLocalAU(new Date(result.Order.timestamp[0]));
                if (isSameMonth(orderTimestamp, toLocalAU(curr))) {
                    sum += result.Order.items.reduce(
                        (acc: number, cur: any) =>
                            acc + parseFloat(cur.itemQuantity[0]) * parseFloat(cur.itemPrice[0]),
                        0
                    );
                }
            } catch (err) {
                console.error("Error parsing XML in getMonthlyCosts:", err);
            }
        }
        analytics.push({ year: getYear(curr), month: format(curr, "MMM"), cost: sum });
    }

    return analytics;
}

export async function getOrdersByDay(userId: string): Promise<{ day: string, total: number }[]> {
    const orders = await DBgetUBLDocs(userId);
    const now = toLocalAU(new Date());
    const dailyCount: Record<string, number> = {};

    for (let order of orders) {
        try {
            const result = await parseStringPromise(order.fileContents);
            const timestamp = toLocalAU(new Date(result.Order.timestamp[0]));
            if (isSameMonth(timestamp, now)) {
                const dayLabel = format(timestamp, "MMM dd");
                dailyCount[dayLabel] = (dailyCount[dayLabel] || 0) + 1;
            }
        } catch (err) {
            console.error("Error parsing XML in getOrdersByDay:", err);
        }
    }

    return Object.entries(dailyCount)
        .map(([day, total]) => ({ day, total }))
        .sort((a, b) => parseInt(a.day.split(' ')[1]) - parseInt(b.day.split(' ')[1]));
}

export async function getTopProductCategories(userId: string): Promise<{ category: string, count: number }[]> {
    const orders = await DBgetUBLDocs(userId);
    const now = toLocalAU(new Date());
    const categoryMap: Record<string, number> = {};

    for (let order of orders) {
        try {
            const result = await parseStringPromise(order.fileContents);
            const orderTimestamp = toLocalAU(new Date(result.Order.timestamp[0]));
            if (isSameMonth(orderTimestamp, now)) {
                for (let item of result.Order.items) {
                    const description = item.itemDescription?.[0] || 'Unknown';
                    categoryMap[description] = (categoryMap[description] || 0) + 1;
                }
            }
        } catch (err) {
            console.error("Error parsing XML in getTopProductCategories:", err);
        }
    }

    return Object.entries(categoryMap)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count);
}

export async function getAverageOrderValue(userId: string): Promise<number> {
    const orders = await DBgetUBLDocs(userId);
    const now = toLocalAU(new Date());
    let totalValue = 0;
    let count = 0;

    for (const order of orders) {
        try {
            const result = await parseStringPromise(order.fileContents);
            const orderTimestamp = toLocalAU(new Date(result.Order.timestamp[0]));
            if (isSameMonth(orderTimestamp, now)) {
                const value = result.Order.items.reduce(
                    (acc: number, cur: any) =>
                        acc + parseFloat(cur.itemQuantity[0]) * parseFloat(cur.itemPrice[0]),
                    0
                );
                totalValue += value;
                count++;
            }
        } catch (err) {
            console.error("Error parsing XML in getAverageOrderValue:", err);
        }
    }

    return count > 0 ? totalValue / count : 0;
}