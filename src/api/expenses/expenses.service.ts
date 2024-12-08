import { RequestHandler, Request, Response } from "express";
import expenseModel from "../../models/expense.js";

export const getExpenses: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    let { page = 1, take = 5 } = req.query;

    page = Number(page);
    take = Number(take);

    if (take < 1) {
      take = 1;
    } else if (take > 5) {
      take = 5;
    }
    
    const totalExpenseCound = await expenseModel.countDocuments();
    const totalPage = Math.ceil(totalExpenseCound / take);

    if (page < 1) {
      page = 1;
    } else if (page > totalPage) {
      page = totalPage;
    }

    const slicedExpense = await expenseModel
      .find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * take)
      .limit(take);

    const expenses = await expenseModel.find();

    const totalExpense = expenses.reduce((tot, curr) => {
      return (tot += Number(curr.price));
    }, 0);

    res.status(200).render("pages/expenses.ejs", {
      slicedExpense,
      totalExpense,
      currentPage: page,
      totalPage,
    });
  } catch (error: any) {
    console.log("Error: ", error.message);
    res
      .status(500)
      .json({ message: "error retrieving data", data: null });
  }
};

export const getExpensesById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const expense = await expenseModel.findById(id);
    if (!expense) {
      res.status(404).json({ message: "Expense not found", data: null });
      return;
    }

    res.status(200).json({ message: "Success", data: expense });
  } catch (error: any) {
    console.error("Error: ", error.message);
    res.status(500).json({ message: "Error retrieving data" });
  }
};

export const addExpenses: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { category, price, paymentMethod } = req.body;

    if (!category || !price || !paymentMethod) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newExpense = await expenseModel.create({
      category,
      price,
      paymentMethod,
    });
    res.status(201).json({ message: "New expense created", data: newExpense });
  } catch (error: any) {
    console.error("Error: ", error.message);
    res.status(500).json({ message: "Error adding data", data: null });
  }
};

export const deleteExpenses: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const deletedExpense = await expenseModel.findByIdAndDelete(id);
    if (!deletedExpense) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Expense deleted successfully", data: deletedExpense });
  } catch (error: any) {
    console.error("Error: ", error.message);
    res.status(500).json({ message: "Error deleting data", data: null });
  }
};

export const updateExpenses: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const updatedExpense = await expenseModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedExpense) {
      res.status(404).json({ message: "Expense not found", data: null });
      return;
    }

    res
      .status(200)
      .json({ message: "Expense updated successfully", data: updatedExpense });
  } catch (error: any) {
    console.error("Error: ", error.message);
    res.status(500).json({ message: "Error updating data", data: null });
  }
};

export const getDetails: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const expense = await expenseModel.findById(id);
    if (!expense) {
      res.status(404).json({ message: "Expense not found", data: null });
      return;
    }

    res.status(200).render("pages/details.ejs", { expense });
  } catch (error: any) {
    console.error("Error: ", error.message);
    res.status(500).json({ message: "Error retrieving data" });
  }
};
