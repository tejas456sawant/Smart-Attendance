/** @format */

const router = require("express").Router();
const Firebase = require("../Components/Firebase");
require("../Components/sendMail");

let db = Firebase.firestore();

router.route("/check/:enrollment").get((req, res) => {
  var enroll = req.params.enrollment;
  console.log(req.params);
  let docRef = db.collection("StudentInformation").doc(enroll.toString());
  docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        res.json("Found");
      } else {
        res.json("NotFound");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
});

router.post("/reg", async (req, res) => {
  //taking all student information

  console.log(req.body);

  var stdEnroll = req.body.studentEnrollment;
  var stdName = req.body.studentName;
  var stdDivision = req.body.studentDivision;
  var stdBatch = req.body.studentBatch;
  var stdEmail = req.body.studentEmail;
  var stdPhone = req.body.studentPhone;
  var stdImg = req.body.studentImage;

  Firebase.auth()
    .createUserWithEmailAndPassword(stdEmail, stdEnroll)
    .then((responseCreateAccount) => {
      let docRef = db.collection("StudentInformation").doc(stdEnroll);
      //Creating object to store data.
      docRef
        .set({
          StudentEnrollment: stdEnroll,
          StudentName: stdName,
          StudentDivision: stdDivision,
          StudentBatch: stdBatch,
          StudentEmail: stdEmail,
          StudentPhone: stdPhone,
          StudentImage: stdImg,
          notificationToken: "",
        })
        .then(() => {
          Firebase.database()
            .ref("/StudentImages")
            .update({
              [stdEnroll]: stdImg,
            })
            .then(() => {
              create_mail(stdEnroll, stdEmail);
              //send_mail(stdEmail);
              res.json("Created");
            })
            .catch((error) => {
              console.log(error);
            });
        })

        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      //handling error while creating account
      console.log(err);
    });
  //res.json('Recived');
});

module.exports = router;
