const validator = require("../helpers/validator");

const validateBody = async (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    userName: "required|string",
    password: "required|string|min:8",
    email: "required|string|email",
    nickName: "required|string",
    gender: "required|string",
  };

  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res
        .status(412)
        .send({ success: false, message: "Validation Failed", data: err });
    } else {
      next();
    }
  });
};

module.exports = {
  validateBody,
};
