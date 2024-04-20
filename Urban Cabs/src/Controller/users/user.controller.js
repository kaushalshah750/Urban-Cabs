import userBusiness from '../../Business/user.business';
import responsedata from '../../Utils/response';

exports.createUser = (req, res) => {
    userBusiness.createUser(req.body, req.user)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}
