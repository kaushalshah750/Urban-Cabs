import express from 'express';
var router = express.Router();

import userRoutes from './users/user.routes';
import cabRoutes from './cabs/cab.routes';
import loanRoutes from './loans/loan.routes';
import incomeRoutes from './incomes/income.routes';
import expenseRoutes from './expenses/expense.routes';

router.use('/users', userRoutes());
router.use('/users', userRoutes());
router.use('/cabs', cabRoutes());
router.use('/loans', loanRoutes());
router.use('/income', incomeRoutes());
router.use('/expense', expenseRoutes());

module.exports = router;