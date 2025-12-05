import { parseString } from "xml2js";
import { DBgetUBLDocs } from "./database";
import { getDate, addMonths, format, getYear, isSameMonth, startOfMonth } from "date-fns";
import { monthlyCost } from "./object";
import { InvalidInfo } from "./Errors";

export async function getMonthlyCosts(userId: string, startDate: string, endDate: string): Promise<monthlyCost[]> {
    if (!startDate || !endDate) {
        throw new InvalidInfo("startDate and endDate queries not supplied!");
    }

    const analytics: monthlyCost[] = [];
    const orders = await DBgetUBLDocs(userId);
    for (let curr = new Date(startDate); curr <= new Date(endDate); curr = addMonths(curr, 1)) {
        let sum = 0;
        for (let order of orders) {
            parseString(order.fileContents, (err, result) => {
                if (err) return;
                if (isSameMonth(new Date(result.Order.timestamp[0]), curr)) {
                    sum += result.Order.items.reduce((acc: number, cur: any) => acc + parseInt(cur.itemQuantity[0]) * parseInt(cur.itemPrice[0]), 0);
                }
            });
        }
        analytics.push({ year: getYear(curr), month: format(curr, "MMM"), cost: sum });
    }

    return analytics;
}

export async function getOrdersByDay(userId: string): Promise<{ day: string, total: number }[]> {
    const orders = await DBgetUBLDocs(userId);
    const now = new Date();
    const dailyCount: Record<string, number> = {};
  
    for (let order of orders) {
      await new Promise<void>((resolve) => {
        parseString(order.fileContents, (err, result) => {
          if (err) return resolve();
  
          const timestamp = new Date(result.Order.timestamp[0]);
          if (isSameMonth(timestamp, now)) {
            const dayLabel = format(timestamp, "MMM dd");
            dailyCount[dayLabel] = (dailyCount[dayLabel] || 0) + 1;
          }
          resolve();
        });
      });
    }
  
    return Object.entries(dailyCount)
      .map(([day, total]) => ({ day, total }))
      .sort((a, b) => parseInt(a.day.split(' ')[1]) - parseInt(b.day.split(' ')[1]));
  }
  
  
  

export async function getTopProductCategories(userId: string): Promise<{ category: string, count: number }[]> {
    const orders = await DBgetUBLDocs(userId);
    const now = new Date();
    const categoryMap: Record<string, number> = {};

    for (let order of orders) {
        parseString(order.fileContents, (err, result) => {
            if (err) return;
            if (isSameMonth(new Date(result.Order.timestamp[0]), now)) {
                for (let item of result.Order.items) {
                    const description = item.itemDescription?.[0] || 'Unknown';
                    categoryMap[description] = (categoryMap[description] || 0) + 1;
                }
            }
        });
    }

    return Object.entries(categoryMap).map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count).slice(0, 5);
}

import { parseStringPromise } from "xml2js"; // ✅ use the promise-based one

export async function getAverageOrderValue(userId: string): Promise<number> {
  const orders = await DBgetUBLDocs(userId);
  const now = new Date();
  let totalValue = 0;
  let count = 0;

  for (const order of orders) {
    try {
      const result = await parseStringPromise(order.fileContents);
      if (isSameMonth(new Date(result.Order.timestamp[0]), now)) {
        const value = result.Order.items.reduce(
          (acc: number, cur: any) =>
            acc + parseInt(cur.itemQuantity[0]) * parseInt(cur.itemPrice[0]),
          0
        );
        totalValue += value;
        count++;
      }
    } catch (err) {
      console.error("Error parsing XML:", err);
    }
  }

  return count > 0 ? totalValue / count : 0;
}

