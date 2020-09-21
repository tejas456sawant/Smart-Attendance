/** @format */

const router = require("express").Router();
const Firebase = require("../Components/Firebase");

var db = Firebase.firestore();

router.route("/subject/:subject").get((req, res) => {
  var dataRes = [];
  var subject = req.params.subject;
  console.log(subject);
  db.collection("AttendanceTable")
    .doc(subject.split(":")[1])
    .get()
    .then(async function (querySnapshot) {
      var objForEnrollemnt = {};
      if (querySnapshot.get(subject.split(":")[0])) {
        querySnapshot.get(subject.split(":")[0]).map((enrollment) => {
          objForEnrollemnt[enrollment] = "true";
        });
        dataRes.push({
          date: subject.split(":")[1],
          present: objForEnrollemnt,
        });
      }
      res.json(dataRes);
      objForEnrollemnt = {};
      console.log(dataRes);
    });
  dataRes = [];
});

router.route("/allStudents").get((req, res) => {
  var enrollment = [];
  db.collection("StudentInformation")
    .get()
    .then((student) => {
      student.docs.forEach((stdEnroll) => {
        enrollment.push(stdEnroll.id);
      });
      res.json(enrollment);
      enrollment = [];
    })
    .catch((error) => {
      res.json(error.message);
    });
});

router.route("/student/:enrollment").get((req, res) => {
  const { enrollment } = req.params;
  var data1;
  var db = Firebase.firestore();
  db.collection("StudentPercent")
    .doc(enrollment)
    .get()
    .then((aa) => {
      //console.log((aa.data().Android[0])/((aa.data().Android[0])+(aa.data().Android[1]))100);
      var arr1 = [],
        arr2 = [];

      for (var i = 0; i < Object.keys(aa.data()).length; i++) {
        arr1.push(Object.keys(aa.data())[i]);
        arr2.push(
          parseFloat(
            (100 * aa.get(arr1[i])[0]) /
              (aa.get(arr1[i])[0] + aa.get(arr1[i])[1]),
          ).toFixed(2),
        );
      }
      console.log({ lecture: arr1, percent: arr2 });
      res.json({ lecture: arr1, percent: arr2 });
      arr1 = [];
      arr2 = [];
    });
});

router.post("/student", (req, res) => {
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
      for (var i = 0; i < subjects.length; i++) {
        cols.push({
          dataField: subjects[i],
          text: subjects[i],
        });
      }

      let p = 0;
      let a = 0;
      let lecture = [];
      let percent = [];
      for (var i = 0; i < subjects.length; i++) {
        dates.docs.forEach((date) => {
          if (date.get(subjects[i]) !== undefined) {
            if (date.get(subjects[i]).includes(enrollment)) {
              p++;
            } else {
              a++;
            }
          } else {
          }
        });
        if (isFinite((p / dates.size) * 100)) {
          lecture.push(subjects[i]);
          percent.push(((p / dates.size) * 100).toFixed(2).toString());
        } else {
          lecture.push(subjects[i]);
          percent.push("0");
        }
        console.log(subjects[i], p, a, dates.size, (p / dates.size) * 100);
        p = 0;
        a = 0;
      }
      res.json({
        lecture,
        percent,
      });
      lecture = [];
      percent = [];
    });
});

module.exports = router;
