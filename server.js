const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./error/errorMiddleware');

const incomes = require('./routes/incomeRoutes');
const expenses = require('./routes/expensesRoutes');
const budget = require('./routes/budgetRoutes');
const users = require('./routes/userRoutes');

dotenv.config({ path: './config.env' });

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/incomes', incomes);

app.use('/api/expenses', expenses);

app.use('/api/budget', budget);

app.use('/api/users', users);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
