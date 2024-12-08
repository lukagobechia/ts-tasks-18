import { Router } from "express";
import expensesRouter from "./expenses/expenses.routes";

const apiRouter = Router();

apiRouter.get("/", async (req, res) => {
  res.redirect("api/expenses");
});

apiRouter.use("/expenses", expensesRouter);

export default apiRouter;