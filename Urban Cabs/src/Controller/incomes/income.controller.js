import incomeBusiness from '../../Business/income.business';
import responsedata from '../../Utils/response';

exports.addNewIncome = (req, res) => {
    incomeBusiness.addNewIncome(req.body)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

exports.editIncome = (req, res) => {
    incomeBusiness.editIncome(req.body)
    .then(data => responsedata(res, false, "", data))
    .catch(err => responsedata(res, true, err, null));
}

exports.deleteIncome = (req, res) => {
    incomeBusiness.deleteIncome(req.params.id)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

exports.getIncomeList = (req, res) => {
    incomeBusiness.getIncomeList()
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

exports.getBalance = (req, res) => {
    incomeBusiness.getBalance()
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

