/** @format */

const router = require("express").Router();
const Firebase = require("../Components/Firebase");
const firebase = require("firebase");

let db = Firebase.firestore();
/*
JP-II-Lec
JP-II-Prac
ST-Lec
ST-Prac
JSP-Lec
JSP-Prac
Android-Lec
Android-Prac
CS-Prac
CS-Lec

*/

var timeRange = [
  "1.00-2.00",
  "10.30-11.30",
  "11.30-12.00",
  "12.00-1.00",
  "2.00-3.00",
  "3.00-4.00",
  "8.30-9.30",
  "9.30-10.30",
];

router.post("/classorlab", (req, res) => {
  const { classorlab } = req.body;

  db.collection("OtherInfo")
    .doc("ClassAndLab")
    .get()
    .then((rooms) => {
      if (rooms.get("rooms") !== undefined) {
        if (rooms.get("rooms").includes(classorlab)) {
          return res.json("Classroom or Lab already added.");
        }
      } else {
        db.collection("OtherInfo")
          .doc("ClassAndLab")
          .set(
            {
              rooms: firebase.firestore.FieldValue.arrayUnion(classorlab),
            },
            {
              merge: true,
            },
          )
          .then(() => {
            for (var i = 0; i < timeRange.length; i++) {
              db.collection("TimeTable" + "-" + classorlab)
                .doc(timeRange[i])
                .set({
                  Friday: "Break",
                  Thursday: "Break",
                  Monday: "Break",
                  Saturday: "Break",
                  Tuesday: "Break",
                  Wednesday: "Break",
                  id: timeRange[i],
                })
                .then(() => {
                  console.log("Added");
                })
                .catch((error) => {
                  console.error(error);
                });
            }
            res.json("Class Or Lab Added.");
          });
      }
    });
});

router.post("/division", (req, res) => {
  const { division } = req.body;
  db.collection("OtherInfo")
    .doc("Division")
    .get()
    .then((divisions) => {
      if (divisions.get("divisions") === undefined) {
        db.collection("OtherInfo")
          .doc("Division")
          .set(
            {
              divisions: firebase.firestore.FieldValue.arrayUnion(division),
            },
            {
              merge: true,
            },
          )
          .then(() => {
            res.json("Division Added.");
          });
      } else {
        if (divisions.get("divisions").includes(division)) {
          return res.json("Division already exist.");
        } else {
          db.collection("OtherInfo")
            .doc("Division")
            .set(
              {
                divisions: firebase.firestore.FieldValue.arrayUnion(division),
              },
              {
                merge: true,
              },
            )
            .then(() => {
              res.json("Division Added.");
            });
        }
      }
    });
});

router.post("/subject", (req, res) => {
  const { division, subject } = req.body;

  db.collection("OtherInfo")
    .doc("Subjects")
    .get()
    .then((divisions) => {
      if (divisions.get(division) !== undefined) {
        if (divisions.get(division).includes(`${subject}-${division}`)) {
          return res.json("Subject already exist.");
        }
      } else {
        db.collection("OtherInfo")
          .doc("Subjects")
          .set(
            {
              [division]: firebase.firestore.FieldValue.arrayUnion(
                `${subject}-${division}`,
              ),
            },
            {
              merge: true,
            },
          )
          .then(() => {
            res.json("Subject Added.");
          });
      }
    });
});

router.post("/complaint", (req, res) => {
  const { enrollment, message } = req.body;
  db.collection("Complaints")
    .doc()
    .set({
      enrollment,
      message,
      status: "No",
    })
    .then(() => {
      res.json("Submitted");
    });
});

module.exports = router;
