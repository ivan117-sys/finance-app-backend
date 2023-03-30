const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/userModel');

//  Get  user
exports.getUsers = asyncHandler(async (req, res) => {
  const userId = req.params.uid;
  const users = await User.findById(userId);

  if (!users || users.length === 0) {
    res.status(400);
    throw new Error('Fetching failed, please try again later');
  }
  res.status(200).json({ users: users.toObject({ getters: true }) });
});

// Signup user

exports.createUser = asyncHandler(async (req, res) => {
  const { name, email, password, expenses, budget } = req.body;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    res.status(400);
    throw new Error('User exists already, try loging in instead');
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    res.status(500);
    throw new Error('Could not create a user, please try again');
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    incomes: [],
    expenses,
    budget,
  });

  await createdUser.save();

  if (!createdUser) {
    res.status(400);
    throw new Error(' failed, please try again');
  }

  let token;

  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    res.status(400);
    throw new Error(' failed, please try again');
  }

  res.status(200).json({
    user: createdUser.id,
    email: createdUser.email,
    name: createdUser.name,
    token: token,
  });
});

// Login a user

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  existingUser = await User.findOne({ email: email });

  if (!existingUser) {
    res.status(400);
    throw new Error('Invalid credentials, could not log you in');
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    res.status(500);
    throw new Error(
      'Invalid credentials, could not log you in, please check your credentials and try again'
    );
  }

  if (!isValidPassword) {
    res.status(400);
    throw new Error('Invalid credentials, could not log you in');
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    res.status(400);
    throw new Error('Invalid credentials, could not log you in');
  }

  res.status(200).json({
    userId: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
    token: token,
  });
});
