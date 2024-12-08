import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import apiRouter from "./api/api.routes";
import path from "path";
import connectDB from "./db/db";

const app: Express = express();
const PORT = 3000;

connectDB()
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.render('pages/home.ejs');
});

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
