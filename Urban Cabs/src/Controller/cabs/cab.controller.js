import cabBusiness from '../../Business/cab.business';
import responsedata from '../../Utils/response';

exports.addNewCab = (req, res) => {
    cabBusiness.addNewCab(req.body)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

exports.editCab = (req, res) => {
    cabBusiness.editCab(req.body)
    .then(data => responsedata(res, false, "", data))
    .catch(err => responsedata(res, true, err, null));
}

exports.addCabPayment = (req, res) => {
    cabBusiness.addCabPayment(req.body)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

exports.editCabPayment = (req, res) => {
    cabBusiness.editCabPayment(req.body)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

exports.deleteCabPayment = (req, res) => {
    cabBusiness.deleteCabPayment(req.params.id)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

exports.getCabById = (req, res) => {
    cabBusiness.getCabById(req.params.id)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

exports.getCabList = (req, res) => {
    cabBusiness.getCabList()
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

exports.getCabModel = (req, res) => {
    cabBusiness.getCabModel(req.params.company)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

exports.getCabPayment = (req, res) => {
    cabBusiness.getCabPayment(req.params.id)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

exports.getCabCompany = (req, res) => {
    cabBusiness.getCabCompany()
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}
