import loanBusiness from '../../Business/loan.business';
import responsedata from '../../Utils/response';

exports.addNewLoan = (req, res) => {
    loanBusiness.addNewLoan(req.body)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

exports.editLoan = (req, res) => {
    loanBusiness.editLoan(req.body)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

exports.getLoanById = (req, res) => {
    loanBusiness.getLoanById(req.params.id)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

exports.getLoanList = (req, res) => {
    loanBusiness.getLoanList()
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

exports.getMonthlyEMI = (req, res) => {
    loanBusiness.getMonthlyEMI()
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

exports.removeLoan = (req, res) => {
    loanBusiness.removeLoan(req.params.id)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

exports.getBankList = (req, res) => {
    loanBusiness.getBankList()
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}
