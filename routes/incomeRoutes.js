const express = require('express');
const {
  getIncomes,
  addIncomes,
  updateIncome,
  deleteIncome,
  getIncome,
} = require('../controllers/incomesController');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.use(checkAuth);
router.get('/user/:uid', getIncomes).post('/user/:uid', addIncomes);

router
  .patch('/:iid', updateIncome)
  .delete('/:iid', deleteIncome)
  .get('/:iid', getIncome);

module.exports = router;
