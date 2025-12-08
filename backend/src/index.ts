// backend/api/index.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app';

export default (req: VercelRequest, res: VercelResponse) => {
  // Let Express handle the request
  // @ts-ignore
  app(req, res);
};