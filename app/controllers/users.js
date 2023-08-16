const userModel = require("../models/users");
const hashService = require("../services/hash");

const perPage = 1;

const usersList = async (req, res, next) => {
    try {
        let fields = req.query.fields?.split(",") || [];
        projection = fields.reduce((prev, current) => ({ ...prev, [current]: 1 }), { _id: 0 })

        const currentPage = +req.query.page || 1;
        const offset = (currentPage - 1) * perPage;

        const usersCount = await userModel.countDocuments({});
        const totalPages = Math.ceil(usersCount / perPage);

        const users = await userModel.find({}, { ...projection }).skip(offset).limit(perPage);

        const fieldsQuery = req.query.fields ? `&fields=${req.query.fields}` :
            "";

        const prevPage = hasPrevPage(currentPage) ? `${process.env.APP_URL}/api/v1/users?page=${currentPage - 1}${fieldsQuery}` : null;

        const nextPage = hasNextPage(currentPage, totalPages) ? `${process.env.APP_URL}/api/v1/users?page=${currentPage + 1}${fieldsQuery}` : null;

        res.send({
            success: true,
            message: "users list generated successfully",
            data: users,
            meta: {
                page: currentPage,
                totalPages,
                prevPage,
                nextPage
            }
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
            email,
            password
        } = req.body;

        if (!first_name || !last_name || !mobile || !password) {
            return res.status(422).send({
                error: true,
                message: "invalid entries."
            });
        };

        console.log(password);
        const hashedPassword = hashService.hash(password);
        console.log(hashedPassword);

        const newUser = new userModel({
            first_name,
            last_name,
            mobile,
            wallet,
            email,
            password: hashedPassword
        });

        console.log(newUser);

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
        const { id } = req.params;
        if (!id) {
            return res.status(404).send({
                error: true,
                message: "user not found !"
            });
        };

        let fields = req.query.fields?.split(",") || [];
        projection = fields.reduce((prev, current) => ({ ...prev, [current]: 1 }), { _id: 0 })

        const user = await userModel.findOne({ _id: id }, { ...projection, password: 0 });

        if (!user) {
            return res.status(404).send({
                error: true,
                message: "user not found !"
            });
        };

        res.send({
            success: true,
            message: "got user successfully",
            data: user
        });
    } catch (err) {
        next(err);
    };
};


const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).send({
                error: true,
                message: "user not found !"
            });
        };

        const user = await userModel.deleteOne({ _id: id });

        if (!user) {
            return res.status(404).send({
                error: true,
                message: "user not found !"
            });
        };

        res.send({
            success: true,
            message: "the user deleted successfully",
        });
    } catch (err) {
        next(err);
    };
};

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).send({
                error: true,
                message: "user not found !"
            });
        };

        const updateData = { ...req.body };
        if (updateData.password) {
            updateData.password = hashService.hash(updateData.password);
        };


        const { matchedCount, modifiedCount } = await userModel.updateOne({ _id: id }, updateData);
        if (!matchedCount || !modifiedCount) {
            return res.status(404).send({
                error: true,
                message: "update failed !"
            });
        };

        res.send({
            success: true,
            message: "the user updated successfully."
        });

    } catch (err) {
        next(err);
    }
};


const hasPrevPage = (currentPage) => currentPage > 1;
const hasNextPage = (currentPage, totalPages) => currentPage < totalPages;

module.exports = {
    usersList,
    insertUser,
    getUser,
    deleteUser,
    updateUser
};