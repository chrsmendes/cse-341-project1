const MongoDB = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    const result = await MongoDB.getDatabase().db().collection("users").find();

    result.toArray().then((users) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await MongoDB.getDatabase().db().collection("users").find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader("Content-Type", "application/json");
        if (users.length > 0) {
            res.status(200).json(users[0]);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    });
};

module.exports = {
    getAll,
    getSingle
};
