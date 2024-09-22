import express from 'express';
var router = express.Router();
import cabs from './cab.controller'

module.exports = () => {
    router.get("/", cabs.getCabList);
    router.get("/:id", cabs.getCabById);
    router.post("/add", cabs.addNewCab);
    router.post("/edit", cabs.editCab);
    router.post("/payment/add", cabs.addCabPayment);
    router.post("/payment/edit", cabs.editCabPayment);
    router.delete("/payment/:id/delete", cabs.deleteCabPayment);
    router.get("/company", cabs.getCabCompany);
    router.get("/:company/model", cabs.getCabModel);
    router.get("/:id/payment", cabs.getCabPayment);
    return router;
}