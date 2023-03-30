const express = require('express');
const {
  getUsers,
  createUser,
  loginUser,
} = require('../controllers/usersController');

const router = express.Router();

// Get users
router.get('/:uid', getUsers);

// Signup users
router.post('/signup', createUser);

// Login users
router.post('/login', loginUser);

module.exports = router;
