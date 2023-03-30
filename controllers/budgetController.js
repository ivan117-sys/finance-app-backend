const asyncHandler = require('express-async-handler');

const Budget = require('../model/budgetModel');

// Get budget

exports.getBudget = asyncHandler(async (req, res) => {
  const userId = req.params.uid;

  const budget = await Budget.find({ creator: userId });

  if (!budget || budget.length === 0) {
    res.status(400);
    throw new Error('There is no budget for this user!');
  }

  res
    .status(200)
    .json({ budget: budget.map(budget => budget.toObject({ getters: true })) });
});

// Add budget

exports.addBudget = asyncHandler(async (req, res) => {
  const newBudget = await Budget.create(req.body);

  res.status(200).json({ newBudget: newBudget });
});

// Update Budget

exports.updateBudget = asyncHandler(async (req, res) => {
  const budgetId = req.params.uid;
  const budget = await Budget.find({ creator: budgetId });

  if (!budget) {
    res.status(400);
    throw new Error('Something went wrong, please try again');
  }

  const updatedBudget = await Budget.findOneAndUpdate(
    { creator: budgetId },
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({
    budget: updatedBudget,
  });
});
