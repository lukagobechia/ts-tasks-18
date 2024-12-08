import { Request, Response, NextFunction } from "express";

export function isValidApiKeyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.headers["api-key"];
  if (!apiKey || apiKey !== "12345") {
    return res.status(403).json({ message: "Unauthorized", data: null });
  }
  next();
}
