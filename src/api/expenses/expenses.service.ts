import { Request, Response } from "express";
import fs from "fs/promises";

interface IExpense {
  id: number;
  category: string;
  price: number;
  paymentMethod: string;
  date: Date;
}

export const getExpenses = async (req: Request, res: Response): Promise<void> => {
  try {
    const expenses = await fs.readFile("src/db/expenses.json", "utf-8");
    const parsedExpenses: IExpense[] = JSON.parse(expenses);

    let { page = 1, take = 10 } = req.query as { page?: number; take?: number };

    page = Number(page);
    take = Number(take);

    if (take < 1) {
      take = 10;
    } else if (take > 10) {
      take = 10;
    }

    const totalPages =
      parsedExpenses.length === 0
        ? 1
        : parsedExpenses.length % take === 0
        ? parsedExpenses.length / take
        : Math.floor(parsedExpenses.length / take) + 1;

    if (page < 1) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }

    parsedExpenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const slicedExpense = parsedExpenses.slice((page - 1) * take, take * page);
    res.status(200).json({slicedExpense})
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.message);
      res.status(500).json({ message: "error retrieving data", data: null });
    } else {
      console.log("Unexpected error: ", error);
      res.status(500).json({ message: "error retrieving data", data: null });
    }
  }
};

export const getExpensesById = async (req: Request, res: Response): Promise<void> => {
  try {
    const expenses = await fs.readFile("src/db/expenses.json", 'utf-8');
    const parsedExpenses: IExpense[] = JSON.parse(expenses || "[]");
    const { id } = req.params;
    const expense = parsedExpenses.find((el) => el.id === Number(id));

    if (!expense) {
      res.status(404).json({ message: "expense not found", data: null });
      return;
    }
    res.status(200).json({ message: "success", data: expense });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error get: ", error.message);
      res.status(500).json({ message: "error retrieving data" });
    } else {
      console.log("Unexpected error: ", error);
      res.status(500).json({ message: "error retrieving data" });
    }
  }
};

export const addExpenses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, price, paymentMethod } = req.body;

    const expenses = await fs.readFile("src/db/expenses.json", "utf-8");
    const parsedExpenses: IExpense[] = JSON.parse(expenses || "[]");
    const lastId = parsedExpenses[parsedExpenses.length - 1]?.id || 0;

    const newExpense: IExpense = {
      id: lastId + 1,
      category: category,
      price: price,
      paymentMethod: paymentMethod,
      date: new Date().toISOString() as unknown as Date,
    };

    parsedExpenses.push(newExpense);

    await fs.writeFile(
      "src/db/expenses.json",
      JSON.stringify(parsedExpenses, null, 2)
    );

    res.status(201).json({ message: "New expense created", data: newExpense });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.message);
      res.status(500).json({ message: "error adding data", data: null });
    } else {
      console.log("Unexpected error: ", error);
      res.status(500).json({ message: "error adding data", data: null });
    }
  }
};

export const deleteExpenses = async (req: Request, res: Response): Promise<void> => {
  try {
    const expenses = await fs.readFile("src/db/expenses.json", "utf-8");
    const parsedExpenses: IExpense[] = JSON.parse(expenses || "[]");

    const { id } = req.params;

    const index = parsedExpenses.findIndex((el) => el.id === Number(id));

    if (index === -1) {
      res.status(404).json({ message: "expense not found", data: null });
      return;
    }

    const deletedItem = parsedExpenses.splice(index, 1);

    await fs.writeFile(
      "src/db/expenses.json",
      JSON.stringify(parsedExpenses, null, 2)
    );
    res.status(200).json({ message: "deleted successfully", data: deletedItem });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.message);
      res.status(500).json({ message: "error deleting data", data: null });
    }
  }
};

export const updateExpenses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { category, price, paymentMethod } = req.body;

    const expenses = await fs.readFile("src/db/expenses.json", "utf-8");
    const parsedExpenses: IExpense[] = JSON.parse(expenses || "[]");

    const index = parsedExpenses.findIndex((el) => el.id === Number(id));
    if (index === -1) {
      res.status(404).json({ message: "expense not found", data: null });
      return;
    }

    parsedExpenses[index] = {
      ...parsedExpenses[index],
      category: category || parsedExpenses[index].category,
      price: price || parsedExpenses[index].price,
      paymentMethod: paymentMethod || parsedExpenses[index].paymentMethod,
    };

    await fs.writeFile(
      "src/db/expenses.json",
      JSON.stringify(parsedExpenses, null, 2)
    );

    res.status(200).json({ message: "updated successfully", data: parsedExpenses[index] });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.message);
      res.status(500).json({ message: "error updating data", data: null });
    }
  }
};
