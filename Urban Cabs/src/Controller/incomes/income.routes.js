import express from 'express';
var router = express.Router();
import income from './income.controller'

module.exports = () => {
    router.get("/", income.getIncomeList);
    router.get("/balance", income.getBalance);
    router.post("/add", income.addNewIncome);
    router.post("/edit", income.editIncome);
    router.delete("/:id/delete", income.deleteIncome);
    return router;
}