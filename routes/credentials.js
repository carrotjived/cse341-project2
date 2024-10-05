const router = require("express").Router();

const credentialsController = require("../controllers/credentials");

//Get All Credentials
router.get("/", credentialsController.getAll);

//Get one credential by Id
router.get("/:id", credentialsController.getOne);

//Create credential
router.get("/", credentialsController.createCredential);

//Update credential
router.get("/:id", credentialsController.updateCredential);

//Delete Credential
router.get("/", credentialsController.deleteCredential);



