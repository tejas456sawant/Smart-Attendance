/** @format */

const router = require("express").Router();
const Firebase = require("../Components/Firebase");

router.route("/").post((req, res) => {
  const { email, password } = req.body;
  console.log(email);
  Firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      console.log(data.user.email);
      res.json(data.user.email);
    })
    .catch((error) => {
      console.log(error.message);
      res.json(error.message);
    });
});

module.exports = router;
