const usersModel = require("../models/users");
const tokenService = require("../services/token");
const hashService = require("../services/hash");


const newSession = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await usersModel.findOne({ email });
        if (!user) {
            return res.status(403).send({
                error: true,
                code: 404,
                message: "invalid email !"
            });
        };
        if (!hashService.compare(password, user.password)) {
            return res.status(403).send({
                error: true,
                code: 403,
                message: "access denied !"
            });
        };

        const token = tokenService.sign({id: user._id});
        res.send({
            status: true,
            code: 200,
            token
        });

    } catch (err) {
        next(err);
    };
};

module.exports = {
    newSession
};