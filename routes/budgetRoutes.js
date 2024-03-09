const express = require('express');
const {
  getBudget,
  updateBudget,
  addBudget,
} = require('../controllers/budgetController');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();
router.get('/user/:uid', getBudget).post('/user/:uid', addBudget);

router.patch('/:uid', updateBudget);
router.use(checkAuth);

module.exports = router;
