/** @format */

const router = require("express").Router();
const Firebase = require("../Components/Firebase");
var auth = Firebase.auth();
var db = Firebase.firestore();
var AttendanceDate = [];

router.post("/date", (req, res) => {
  const { startDate, endDate, selectedDivision } = req.body;
  db.collection("AttendanceTable")
    .get()
    .then((sub) => {
      sub.forEach((document1) => {
        var dateFrom = startDate;
        var dateTo = endDate;
        var dateCheck = document1.id;

        var d1 = dateFrom.split("-");
        var d2 = dateTo.split("-");
        var c = dateCheck.split("-");
        var from = new Date(
          parseInt(d1[0]),
          parseInt(d1[1]),
          parseInt(d1[2]),
        ).getTime(); // -1 because months are from 0 to 11
        var to = new Date(
          parseInt(d2[0]),
          parseInt(d2[1]),
          parseInt(d2[2]),
        ).getTime();
        var check = new Date(
          parseInt(c[0]),
          parseInt(c[1]),
          parseInt(c[2]),
        ).getTime();
        if (check >= from)
          if (check <= to)
            AttendanceDate.push({
              date: document1.id,
            });
      });
      res.json(AttendanceDate);
      AttendanceDate = [];
    });
});

router.route("/enrollment/:enroll").get((req, res) => {
  const { enroll } = req.params;
  var enrollment = [];
  db.collection("StudentInformation")
    .get()
    .then((student) => {
      student.docs.forEach((stdEnroll) => {
        if (stdEnroll.id === enroll) enrollment.push(stdEnroll.id);
      });
      res.json(enrollment);
      enrollment = [];
    })
    .catch((error) => {
      res.json(error.message);
    });
});

module.exports = router;
