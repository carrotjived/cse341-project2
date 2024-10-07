const router = require("express").Router();

const credentialsController = require("../controllers/credentials");

//Get All Credentials
router.get("/", credentialsController.getAll);

//Get one credential by Id
router.get("/:id", credentialsController.getOne);

//Create credential
router.post("/", credentialsController.createCredential);

//Update credential
router.put("/:id", credentialsController.updateCredential);

//Delete Credential
router.delete("/", credentialsController.deleteCredential);

module.exports = router;
