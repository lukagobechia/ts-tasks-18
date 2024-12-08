import { Router } from "express";
import {
  getExpenses,
  getExpensesById,
  addExpenses,
  deleteExpenses,
  updateExpenses,
  getDetails,
} from "./expenses.service";
import { requiredField } from "../../middlewares/requiredField.middleware";
import { validateObjectId } from "../../middlewares/validateObjectId";
const expensesRouter: Router = Router();

expensesRouter.get("/", getExpenses);
expensesRouter.get("/:id", validateObjectId,getExpensesById);
expensesRouter.post("/", requiredField, addExpenses);
expensesRouter.delete("/:id",validateObjectId, deleteExpenses);
expensesRouter.put("/:id", validateObjectId,updateExpenses);
expensesRouter.get("/details/:id",validateObjectId, getDetails);

export default expensesRouter;
