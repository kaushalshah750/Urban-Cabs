import express from 'express';
var router = express.Router();
import expense from './expense.controller'

module.exports = () => {
    router.get("/", expense.getExpenseList);
    router.post("/add", expense.addNewExpense);
    router.post("/edit", expense.editExpense);
    router.delete("/:id/delete", expense.deleteExpense);
    return router;
}