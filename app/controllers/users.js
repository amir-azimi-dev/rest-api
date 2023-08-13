const usersList = (req, res, next) => {
    throw new Error("message");
    res.status(200).send({
        success: true,
        message: "users list"
    });
};

module.exports = {
    usersList,
};