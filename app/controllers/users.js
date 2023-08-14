const userModel = require("../models/users");

const usersList = async (req, res, next) => {
    const users = await userModel.find();
    res.status(200).send({
        success: true,
        message: "users list generated successfully",
        data: users
    });
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

module.exports = {
    usersList,
    insertUser,
};