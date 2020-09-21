/** @format */

var express = require("express");
var router = express.Router();
var Firebase = require("../Components/Firebase");

var db = Firebase.firestore();

router.get("/getInfo/:email", function (req, res) {
  const { email } = req.params;
  db.collection("StudentInformation")
    .get()
    .then((snapshot) => {
      snapshot.docs.map((user) => {
        if (user.get("StudentEmail") === email) res.json(user.data());
      });
    })
    .catch((error) => {
      res.json(error.message);
    });
});

router.get("/getInfo/enroll/:enrollment", function (req, res) {
  const { enrollment } = req.params;
  db.collection("StudentInformation")
    .doc(enrollment)
    .get()
    .then((snapshot) => {
      console.log(snapshot.data());
      res.json(snapshot.data());
    })
    .catch((error) => {
      res.json(error.message);
    });
});
module.exports = router;
