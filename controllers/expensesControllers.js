const asyncHandler = require('express-async-handler');
const Expenses = require('../model/expensesModel');

// Get expenses
exports.getExpenses = asyncHandler(async (req, res) => {
  const userId = req.params.uid;
  const expenses = await Expenses.find({ creator: userId });

  if (!expenses || expenses.length === 0) {
    res.status(400);
    throw new Error('There are no expenses');
  }

  res.status(200).json({
    expenses: expenses.map(expense => expense.toObject({ getters: true })),
  });
});

// Get specific expense

exports.getExpense = asyncHandler(async (req, res) => {
  const expenseId = req.params.eid;

  const expense = await Expenses.findById(expenseId);

  if (!expense) {
    res.status(400);
    throw new Error('Something went wrong');
  }

  res.status(200).json({ expense: expense.toObject({ getters: true }) });
});

// Add expense

exports.addExpenses = asyncHandler(async (req, res) => {
  const newExpense = await Expenses.create(req.body);

  res.status(200).json({ expense: newExpense.toObject({ getters: true }) });
});

// Update expense

exports.updateExpense = asyncHandler(async (req, res) => {
  const expenseId = req.params.eid;
  const expense = await Expenses.findById(expenseId);

  if (!expense) {
    res.status(400);
    throw new Error('Something went wrong, please try again');
  }

  const updatedExpense = await Expenses.findByIdAndUpdate(expenseId, req.body, {
    new: true,
  });

  res.status(200).json({ expense: updatedExpense.toObject({ getters: true }) });
});

// Delete expense

exports.deleteExpense = asyncHandler(async (req, res) => {
  const expenseId = req.params.eid;
  const expense = await Expenses.findById(expenseId);

  if (!expense) {
    res.status(400);
    throw new Error('Something went wrong, please try again');
  }

  await Expenses.findByIdAndDelete(expenseId);

  res.status(200).json({
    message: `expense deleted`,
  });
});
