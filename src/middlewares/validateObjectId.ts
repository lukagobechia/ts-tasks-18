import { isValidObjectId } from "mongoose";
import { Request, Response, NextFunction } from "express";

export const validateObjectId = async (req:Request, res:Response, next:NextFunction) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).render("pages/error.ejs", { message: "Invalid ID format" });
  }

  next();
};
