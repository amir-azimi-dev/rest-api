const userModel = require("../models/users");

const usersList = async (req, res, next) => {
    try {
        let fields = req.query.fields?.split(",") || [];
        projection = fields.reduce((prev, current) => ({ ...prev, [current]: 1 }), { _id: 0 })

        const users = await userModel.find({}, projection);
        res.send({
            success: true,
            message: "users list generated successfully",
            data: users
        });
    } catch (err) {
        next(err);
    };
};

const insertUser = async (req, res, next) => {
    try {
        const {
            first_name,
            last_name,
            mobile,
            wallet,
            email
        } = req.body;

        if (!first_name || !last_name || !mobile) {
            return res.status(422).send({
                error: true,
                message: "invalid entries."
            });
        };

        const newUser = new userModel({
            first_name,
            last_name,
            mobile,
            wallet,
            email
        });

        await newUser.save();
        res.status(201).send({
            success: true,
            message: "new user inserted successfully",
            newUser: newUser
        });
    } catch (err) {
        next(err);
    }
};

const getUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(404).send({
                error: true,
                message: "user not found !"
            });
        };

        let fields = req.query.fields?.split(",") || [];
        projection = fields.reduce((prev, current) => ({ ...prev, [current]: 1 }), { _id: 0 })

        const user = await userModel.findOne({_id: id}, projection);

        if (!user) {
            return res.status(404).send({
                error: true,
                message: "user not found !"
            });
        };

        res.send({
            success: true,
            message: "users list generated successfully",
            data: user
        });
    } catch (err) {
        next(err);
    };
};


module.exports = {
    usersList,
    insertUser,
    getUser
};