/** @format */

const router = require("express").Router();
const Firebase = require("../Components/Firebase");
const firebase = require("firebase");

let db = Firebase.firestore();

router.get("/get/:classorlab", (req, res) => {
  const { classorlab } = req.params;
  var timeTable = [];
  db.collection(`TimeTable-${classorlab}`)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        timeTable.push(doc.data());
      });
      res.json(timeTable);
      timeTable = [];
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
});

router.put("/update/:classorlab", (req, res) => {
  const { classorlab } = req.params;
  var cols = req.body.col;
  var rows = req.body.row.trim();

  db.collection(`TimeTable-${classorlab}`)
    .doc(rows)
    .update({
      [cols]: req.body.newVal,
    })
    .then(res.json("updated.."));
});

module.exports = router;
