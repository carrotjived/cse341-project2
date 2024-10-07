const { mongo } = require("mongoose");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Get All Credentials']
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("game_credentials")
    .find();
  result.toArray().then((credential) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(credential);
  });
};

const getOne = async (req, res) => {
  //#swagger.tags=['Get One Credential by ID']
  const userId = ObjectId.createFromHexString(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("game_credentials")
    .find({ _id: userId });
  result.toArray().then((credential) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(credential[0]);
  });
};

const createCredential = async (req, res) => {
  //#swagger.tags=['Create Credential']
  const credential = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
    nickName: req.body.nickName,
    gender: req.body.gender,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("game_credentials")
    .insertOne(credential);

  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some Error occurred while creation");
  }
};

const updateCredential = async (req, res) => {
  //#swagger.tags=['Update Credentials']
  const userId = ObjectId.createFromHexString(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
    nickName: req.body.nickName,
    gender: req.body.gender,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("game_credentials")
    .replaceOne({ _id: userId }, contact);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some Error occured while deleting the user");
  }
};

const deleteCredential = async (req, res) => {
  //#swagger.tags=['Delete Credential']
  const userId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("game_credentials")
    .deleteOne({ _id: userId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some Error occured whilte deletion.");
  }
};

module.exports = {
  getAll,
  getOne,
  updateCredential,
  createCredential,
  deleteCredential,
};
