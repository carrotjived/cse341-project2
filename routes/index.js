const router = require("express").Router();
const passport = require("passport");

router.use("/", require("./swagger"));

router.use("/credentials", require("./credentials"));

//LOGIN Route
//#swagger.tags=['Login']
router.get("/login", passport.authenticate("github"), (req, res) => {});

//LOGOUT Route
//#swagger.tags=['Logout']
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
