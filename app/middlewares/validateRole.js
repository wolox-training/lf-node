const jwt_decode = require('jwt-decode');
const { error } = require('../../config/messages');

exports.validateRole = (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = jwt_decode(token);
    if (decoded.user.role != 'admin'){
        res.send(error.notAdmin);
        return;
    }
    next();
};