import { Router } from "express";

import {
  getExpenses,
  getExpensesById,
  addExpenses,
  deleteExpenses,
  updateExpenses,
} from "./expenses.service";
// import { requiredField } from "../../middlewares/requiredField.middleware.js";

const expensesRouter = Router();

expensesRouter.get("/", getExpenses);
expensesRouter.get("/:id", getExpensesById);
expensesRouter.post("/", addExpenses);
expensesRouter.delete("/:id", deleteExpenses);
expensesRouter.put("/:id", updateExpenses);
export default expensesRouter;