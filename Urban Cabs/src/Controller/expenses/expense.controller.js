import expenseBusiness from '../../Business/expense.business';
import responsedata from '../../Utils/response';

exports.addNewExpense = (req, res) => {
    expenseBusiness.addNewExpense(req.body)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

exports.editExpense = (req, res) => {
    expenseBusiness.editExpense(req.body)
    .then(data => responsedata(res, false, "", data))
    .catch(err => responsedata(res, true, err, null));
}

exports.deleteExpense = (req, res) => {
    expenseBusiness.deleteExpense(req.params.id)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

exports.getExpenseList = (req, res) => {
    expenseBusiness.getExpenseList()
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}
