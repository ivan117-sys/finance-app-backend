const asyncHandler = require('express-async-handler');
const Incomes = require('../model/incomesModel');

// Get all Incomes

exports.getIncomes = asyncHandler(async (req, res) => {
  const userId = req.params.uid;

  const incomes = await Incomes.find({ creator: userId });

  if (!incomes || incomes.length === 0) {
    res.status(400);
    throw new Error('There are no incomes');
  }

  res.status(200).json({
    income: incomes.map(income => income.toObject({ getters: true })),
  });
});

// Get specific income

exports.getIncome = asyncHandler(async (req, res) => {
  const incomeId = req.params.iid;
  const income = await Incomes.findById(incomeId);

  if (!income) {
    res.status(400);
    throw new Error('Income not found');
  }
  res.status(200).json({ income: income.toObject({ getters: true }) });
});

// Add new Income

exports.addIncomes = asyncHandler(async (req, res) => {
  const newIncome = await Incomes.create(req.body);

  res.status(200).json(newIncome.toObject({ getters: true }));
});

// Update existing income

exports.updateIncome = asyncHandler(async (req, res) => {
  const incomeId = req.params.iid;
  const income = await Incomes.findById(incomeId);

  if (!income) {
    res.status(400);
    throw new Error('Something went wrong, could not update income');
  }

  const updatedIncome = await Incomes.findByIdAndUpdate(incomeId, req.body, {
    new: true,
  });

  res.status(200).json({ income: updatedIncome.toObject({ getters: true }) });
});

// Delete income

exports.deleteIncome = asyncHandler(async (req, res) => {
  const incomeId = req.params.iid;
  const income = await Incomes.findById(incomeId);

  if (!income) {
    res.status(400);
    throw new Error('Something went wrong, could not delete the income');
  }
  await Incomes.findByIdAndDelete(incomeId);

  res.status(200).json({
    id: req.params.iid,
  });
});
