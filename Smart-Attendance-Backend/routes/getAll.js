/** @format */

const router = require("express").Router();
const Firebase = require("../Components/Firebase");
const firebase = require("firebase");

let db = Firebase.firestore();

router.get("/division", (req, res) => {
  db.collection("OtherInfo")
    .doc("Division")
    .get()
    .then((divisions) => {
      res.json(divisions.get("divisions"));
    });
});

router.get("/classorlab", (req, res) => {
  db.collection("OtherInfo")
    .doc("ClassAndLab")
    .get()
    .then((classorlab) => {
      res.json(classorlab.get("rooms"));
    });
});

router.get("/subjects/:purpose", (req, res) => {
  const { purpose } = req.params;

  if (purpose === "table") {
    var tableSubjects = [];
    db.collection("OtherInfo")
      .doc("Subjects")
      .get()
      .then((subjects) => {
        for (var key in subjects.data()) {
          subjects.get(key).map((sub) => {
            tableSubjects.push({
              value: sub,
              label: sub,
            });
          });
        }
        res.json(tableSubjects);
        return (tableSubjects = []);
      });
  }

  if (purpose !== "table") {
    var division = purpose.split("-")[1];
    db.collection("OtherInfo")
      .doc("Subjects")
      .get()
      .then((divisions) => {
        res.json(divisions.get(division));
      });
  }
});

router.post("/attendancesheet", (req, res) => {
  const { enrollment, subjects } = req.body;

  var rows = [];
  var cols = [];
  cols.push({
    dataField: "date",
    text: "Date",
  });
  db.collection("AttendanceTable")
    .get()
    .then((dates) => {
      function mergeObjectsInUnique(array, property) {
        const newArray = new Map();
        array.forEach((item) => {
          const propertyValue = item[property];
          newArray.has(propertyValue)
            ? newArray.set(
                propertyValue,
                Object.assign(
                  Object.assign({}, item),
                  newArray.get(propertyValue),
                ),
              )
            : newArray.set(propertyValue, item);
        });
        return Array.from(newArray.values());
      }

      for (var i = 0; i < subjects.length; i++) {
        cols.push({
          dataField: subjects[i],
          text: subjects[i],
        });
      }

      dates.docs.forEach((date) => {
        for (var i = 0; i < subjects.length; i++) {
          if (date.get(subjects[i]) !== undefined) {
            if (date.get(subjects[i]).includes(enrollment)) {
              rows.push({
                [subjects[i]]: "P",
                date: date.id,
              });
            } else {
              rows.push({
                [subjects[i]]: "A",
                date: date.id,
              });
            }
          } else {
            rows.push({
              [subjects[i]]: "Na",
              date: date.id,
            });
          }
        }
      });
      var newrows = mergeObjectsInUnique(rows, "date");
      res.json({
        newrows,
        cols,
      });
    });
});

router.post("/report", (req, res) => {
  const { division, batch, subject } = req.body;
  var studentEnrollments = [];

  var rows = [];
  var cols = [];
  cols.push({
    dataField: "enrollment",
    text: "Enrollment No",
  });
  db.collection("StudentInformation")
    .get()
    .then((students) => {
      students.docs.forEach((stdInfo) => {
        if (
          stdInfo.get("StudentDivision") === division &&
          stdInfo.get("StudentBatch") === batch
        ) {
          return studentEnrollments.push(stdInfo.id);
        }
      });
    });

  function mergeObjectsInUnique(array, property) {
    const newArray = new Map();
    array.forEach((item) => {
      const propertyValue = item[property];
      newArray.has(propertyValue)
        ? newArray.set(
            propertyValue,
            Object.assign(Object.assign({}, item), newArray.get(propertyValue)),
          )
        : newArray.set(propertyValue, item);
    });
    return Array.from(newArray.values());
  }

  db.collection("AttendanceTable")
    .get()
    .then((dates) => {
      dates.docs.forEach((date) => {
        if (date.get(subject) !== undefined) {
          cols.push({
            dataField: date.id,
            text: date.id,
          });
          for (var i = 0; i < studentEnrollments.length; i++) {
            if (date.get(subject).includes(studentEnrollments[i])) {
              rows.push({
                enrollment: studentEnrollments[i],
                [date.id]: "P",
              });
            } else {
              rows.push({
                enrollment: studentEnrollments[i],
                [date.id]: "A",
              });
            }
          }
        } else {
        }
      });
      var newrows = mergeObjectsInUnique(rows, "enrollment");
      res.json({
        newrows,
        cols,
      });
      rows = [];
      cols = [];
    });
});

router.post("/checkattendance", (req, res) => {
  const { enrollment, date, lecture } = req.body;
  console.log(enrollment, date, lecture);
  console.log(date.split("-")[1].length);
  if (date.split("-")[1].length === 1) {
    var newDate = `${date.split("-")[0]}-0${date.split("-")[1]}-${
      date.split("-")[2]
    }`;
    db.collection("AttendanceTable")
      .doc(newDate)
      .get()
      .then((attendance) => {
        if (attendance.exists) {
          if (attendance.get(lecture) !== undefined) {
            if (attendance.get(lecture).includes(enrollment)) {
              return res.json("P");
            } else {
              return res.json("A");
            }
          } else {
            return res.json("Na");
          }
        } else {
          return res.json("Incorrect Date :(");
        }
      });
  }
  db.collection("AttendanceTable")
    .doc(date)
    .get()
    .then((attendance) => {
      if (attendance.exists) {
        if (attendance.get(lecture) !== undefined) {
          if (attendance.get(lecture).includes(enrollment)) {
            return res.json("P");
          } else {
            return res.json("A");
          }
        } else {
          return res.json("Na");
        }
      } else {
        return res.json("Incorrect Date :(");
      }
    });
});

router.get("/complaint", (req, res) => {});

router.post("/complaint", (req, res) => {});

module.exports = router;
