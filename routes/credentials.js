const router = require("express").Router();

const credentialsController = require("../controllers/credentials");
const validation = require("../middlewares/validator");

//Get All Credentials
router.get("/", credentialsController.getAll);

//Get one credential by Id
router.get("/:id", credentialsController.getOne);

//Create credential
router.post(
  "/",
  validation.validateBody,
  credentialsController.createCredential
);

//Update credential
router.put(
  "/:id",
  validation.validateBody,
  credentialsController.updateCredential
);

//Delete Credential
router.delete("/:id", credentialsController.deleteCredential);

module.exports = router;
