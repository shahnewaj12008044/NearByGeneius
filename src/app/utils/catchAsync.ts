import { NextFunction, Request, RequestHandler, Response } from "express";
//Higher Order function to dry try catch syntax
const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn( req, res, next)).catch((err) => next(err));
    };
  };

export default catchAsync;
