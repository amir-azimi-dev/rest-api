const tokenService = require("../services/token");

module.exports = (req, res, next) => {
    if (!('authorization' in req.headers)) {
        return res.status(401).send({
            status: "error",
            code: 401,
            message: "you are not authorized"
        });
    };

    const [, userToken] = req.headers.authorization.split(" ");
    const token = tokenService.verify(userToken);
    if (!token) {
        return res.status(401).send({
            status: "error",
            code: 401,
            message: "invalid token"
        });
    };

    next();
};