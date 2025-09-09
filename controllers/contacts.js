const MongoDB = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    const result = await MongoDB.getDatabase().db().collection("contacts").find();

    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const result = await MongoDB.getDatabase().db().collection("contacts").find({ _id: contactId });
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        if (contacts.length > 0) {
            res.status(200).json(contacts[0]);
        } else {
            res.status(404).json({ message: "Contact not found" });
        }
    });
};

const createContact = async (req, res) => {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const contact = { firstName, lastName, email, favoriteColor, birthday };
    const result = await MongoDB.getDatabase().db().collection("contacts").insertOne(contact);
    res.setHeader("Content-Type", "application/json");
    res.status(201).json({ id: result.insertedId });
};

const updateContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const contact = { firstName, lastName, email, favoriteColor, birthday };
    const result = await MongoDB.getDatabase().db().collection("contacts").updateOne({ _id: contactId }, { $set: contact });
    if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Contact not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(204).send();
};

const deleteContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const result = await MongoDB.getDatabase().db().collection("contacts").deleteOne({ _id: contactId });
    if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Contact not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Contact deleted successfully" });
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};
