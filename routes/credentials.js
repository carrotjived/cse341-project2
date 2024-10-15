const router = require("express").Router();

const credentialsController = require("../controllers/credentials");
const validation = require("../middlewares/validator");
const { isAuthenticated } = require("../middlewares/authenticate");

//Get All Credentials
router.get("/", isAuthenticated, credentialsController.getAll);

//Get one credential by Id
router.get("/:id", isAuthenticated, credentialsController.getOne);

//Create credential
router.post(
  "/",
  validation.validateBody,
  isAuthenticated,
  credentialsController.createCredential
);

//Update credential
router.put(
  "/:id",
  validation.validateBody,
  isAuthenticated,
  credentialsController.updateCredential
);

//Delete Credential
router.delete("/:id", isAuthenticated, credentialsController.deleteCredential);

module.exports = router;
