const express = require('express');
const {
  getBudget,
  updateBudget,
  addBudget,
} = require('../controllers/budgetController');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.use(checkAuth);
router.get('/user/:uid', getBudget).post('/user/:uid', addBudget);

router.patch('/:uid', updateBudget);

module.exports = router;
