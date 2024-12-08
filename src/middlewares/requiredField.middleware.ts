import { Request, Response, NextFunction } from "express";

export function requiredField(req: Request, res: Response, next: NextFunction): void {
  const { category, price, paymentMethod } = req.body;
  if (!category || !price || !paymentMethod) {
    res.status(400).json({ message: "All the fields are required", data: null });
    return;
  }
  next();
}
