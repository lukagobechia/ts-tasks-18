import express, { Express, Request, Response } from "express";
import expensesRouter from "./api/expenses/expenses.routes";
import bodyParser from "body-parser";
import cors from "cors";
import apiRouter from "./api/api.routes";

const app: Express = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.redirect("/api/expenses");
});
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
