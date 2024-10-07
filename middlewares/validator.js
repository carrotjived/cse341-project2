const validator = require("../helpers/validator");
const ObjectId = require("mongodb").ObjectId;

const validateCreate = async (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    userName: "required|string",
    password: "required|string|min:8|confirmed",
    email: "required|string|email",
    nickName: "required|string",
    gender: "string",
  };

  await validator(req, body, validationRule, {}, (err, status) => {
    if (!status) {
      res
        .status(412)
        .send({ success: false, message: "Validation Failed", data: err });
    } else {
      next();
    }
  }).catch((err) => console.log(err));
};

const validateUpdate = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid credential ID to find credential.");
  }
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    userName: "required|string",
    password: "required|string|min:8|confirmed",
    email: "required|string|email",
    nickName: "required|string",
    gender: "string",
  };

  await validator(req, body, validationRule, {}, (err, status) => {
    if (!status) {
      res
        .status(412)
        .send({ success: false, message: "Validation Failed", data: err });
    } else {
      next();
    }
  }).catch((err) => console.log(err));
};

const validateId = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid credential ID.");
  }
};

module.exports = {
  validateCreate,
  validateId,
  validateUpdate,
};
