import express from 'express';
var router = express.Router();
import loans from './loan.controller'

module.exports = () => {
    router.get("/", loans.getLoanList);
    router.get("/:id/info", loans.getLoanById);
    router.post("/edit", loans.editLoan);
    router.post("/add", loans.addNewLoan);
    router.delete("/:id/remove", loans.removeLoan);
    router.get("/bank", loans.getBankList);
    router.get("/month-emi", loans.getMonthlyEMI);
    return router;
}