import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validationRequest = (shema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await shema.parseAsync({
      body: req.body,
      cookies:req.cookies,
    });
    next();
  });
};

export default validationRequest;
