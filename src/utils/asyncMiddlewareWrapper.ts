import { type Request, type Response, type NextFunction, type RequestHandler } from 'express';

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

export function middlewareWrapper(mw: RequestHandler | AsyncRequestHandler) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await mw(req, res, next);
      if (!res.headersSent) {
        next();
      }
    } catch (error) {
      res.status(500).json('Internal Server Error');
      console.error(error);
    }
  };
}
