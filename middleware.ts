import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import rateLimit from "express-rate-limit";

export const apiLimiter = new rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message:
    "Too many requests created from this IP, please try again after 15 minutes"
});

export const createAccountLimiter = new rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 5,
  message:
    "Too many accounts created from this IP, please try again after 30 minutes"
});

export const checkValidationResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach(error => {
      res
        .status(422)
        .json({ message: `${error.param.toUpperCase()} ${error.msg}` });
    });
  } else {
    next();
  }
};
