/** @format */

const router = require("express").Router();
const Firebase = require("../Components/Firebase");
const axios = require("axios");
const firebase = require("firebase");
require("../Components/getInfo");

var db = Firebase.firestore();
var AttendanceDate = [];

router.route("/getAttendanceData/:date").get((req, res) => {
  var AttendanceData = [];
  db.collection("AttendanceTable")
    .doc(req.params.date)
    .get()
    .then((sub) => {
      db.collection("StudentInformation")
        .get()
        .then(async function (querySnapshot) {
          for (var key in sub.data()) {
            var percent = await Math.round(
              (Object.keys(sub.data()[key]).length / querySnapshot.size) * 100,
            );
            AttendanceData.push({
              lecture: key,
              percent: percent,
            });
          }
          res.json(AttendanceData);
        });
    });
  AttendanceData = [];
});

router.route("/getAttendanceDate").get((req, res) => {
  db.collection("AttendanceTable")
    .get()
    .then((sub) => {
      sub.forEach((document1) => {
        AttendanceDate.push({
          date: document1.id,
        });
      });
      res.json(AttendanceDate);
      AttendanceDate = [];
    });
});

router.route("/mark").post((req, res) => {
  const { date, subject, enrollment } = req.body;
  console.log(date, subject, enrollment);
  db.collection("AttendanceTable")
    .doc(date)
    .get()
    .then((students) => {
      if (students.get(subject) !== undefined) {
        if (students.get(subject).includes(enrollment)) {
          return res.json("Student attendance already marked.");
        }
      } else {
        db.collection("AttendanceTable")
          .doc(date)
          .set(
            {
              [subject]: firebase.firestore.FieldValue.arrayUnion(enrollment),
            },
            {
              merge: true,
            },
          )
          .then(() => {
            res.json("Attendance marked.");
          });
      }
    });
});

router.route("/revoke").post((req, res) => {
  const { date, subject, enrollment } = req.body;
  db.collection("AttendanceTable")
    .doc(date)
    .get()
    .then((students) => {
      if (!students.get(subject).includes(enrollment)) {
        return res.json("Student attendance not marked.");
      } else {
        db.collection("AttendanceTable")
          .doc(date)
          .set(
            {
              [subject]: firebase.firestore.FieldValue.arrayRemove(enrollment),
            },
            {
              merge: true,
            },
          )
          .then(() => {
            res.json("Attendance removed.");
          });
      }
    });
});

router.post("/markattendance", (req, res) => {
  const { enrollMentNo, room } = req.body;

  if (storeInfo("lec") === undefined) {
    return res.json("Currently you dont have any lecture");
  }

  db.collection(`TimeTable-${room}`)
    .doc(storeInfo("lec").toString())
    .get()
    .then((currentLecture) => {
      var lecture = currentLecture.get(currentDayInfo());

      db.collection("AttendanceTable")
        .doc(storeInfo("ymd"))
        .get()
        .then((attendance) => {
          if (attendance.get(lecture) !== undefined) {
            if (attendance.get(lecture).includes(enrollMentNo)) {
              return res.json("Attendance already marked.");
            }
          } else {
            db.collection("AttendanceTable")
              .doc(storeInfo("ymd").toString())
              .set(
                {
                  [lecture]: firebase.firestore.FieldValue.arrayUnion(
                    enrollMentNo,
                  ),
                },
                {
                  merge: true,
                },
              )
              .then(() => {
                return res.json({
                  enrollmentNumber: enrollMentNo,
                  lecture: lecture,
                });
              });
          }
        });
    });
});

module.exports = router;
