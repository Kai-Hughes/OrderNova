import express, { Request, Response } from 'express'; 
import { getMonthlyCosts, getTopProductCategories, getAverageOrderValue, getOrdersByDay } from './analyticsHandler';
import { AuthRequest, monthlyCost } from './object';
import { DatabaseError } from 'pg';
import { InvalidInfo } from './Errors';
import { authenticateJWT } from './tokenHandler';

const router = express.Router();

// startTime, endTime formatted as yyyy-mmm (e.g 2041-feb)
router.get('/v1/users/analytics/monthlycosts', authenticateJWT,
async (req: Request, res: Response) => {
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;
    const { userId }  = (req as unknown as AuthRequest).user;

    let analytics: monthlyCost[] = [];
    try {
        analytics = await getMonthlyCosts(userId, startDate, endDate);
    } catch(err) {
        if (err instanceof DatabaseError) {
            return res.status(500).json({ error: err.message });
        } else if (err instanceof InvalidInfo) {
            return res.status(400).json({ error: err.message });
        }
    }

    return res.status(200).json(analytics);
});

// Total orders this month
router.get('/v1/users/analytics/totalorders', authenticateJWT, async (req: Request, res: Response) => {
    const { userId } = (req as unknown as AuthRequest).user;
    try {
        const dailyOrders = await getOrdersByDay(userId);
        return res.status(200).json(dailyOrders);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch total orders.' });
    }
});

// Top product categories this month
router.get('/v1/users/analytics/topcategories', authenticateJWT, async (req: Request, res: Response) => {
    const { userId } = (req as unknown as AuthRequest).user;
    try {
        const categories = await getTopProductCategories(userId);
        return res.status(200).json(categories);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch product categories.' });
    }
});

// Average order value this month
router.get('/v1/users/analytics/averageordervalue', authenticateJWT, async (req: Request, res: Response) => {
    const { userId } = (req as unknown as AuthRequest).user;
    try {
        const averageValue = await getAverageOrderValue(userId);
        return res.status(200).json({ averageValue });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch average order value.' });
    }
});

export default router;
