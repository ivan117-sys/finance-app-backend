const express = require('express');
const {
  getExpenses,
  addExpenses,
  updateExpense,
  deleteExpense,
  getExpense,
} = require('../controllers/expensesControllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.use(checkAuth);
router.get('/user/:uid', getExpenses).post('/user/:uid', addExpenses);

router
  .patch('/:eid', updateExpense)
  .delete('/:eid', deleteExpense)
  .get('/:eid', getExpense);

module.exports = router;
