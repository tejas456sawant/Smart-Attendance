/** @format */
const router = require("express").Router();
const Firebase = require("../Components/Firebase");
var auth = Firebase.auth();
var db = Firebase.firestore();

router.post("/forgetPassword", (req, res) => {
  const { emailAddress } = req.body;
  console.log(emailAddress);
  auth
    .sendPasswordResetEmail(emailAddress)
    .then(() => {
      res.json({
        head: "Password Reset Link Send.",
        text: "Please Check Your Email.",
      });
    })
    .catch((error) => {
      res.json({
        head: "Error",
        text: "Please check you Email address.",
      });
    });
});

router.post("/addToken", (req, res) => {
  const { email, token } = req.body;
  db.collection("StudentInformation")
    .get()
    .then((snapshot) => {
      snapshot.docs.map((user) => {
        if (user.get("StudentEmail") === email)
          db.collection("StudentInformation")
            .doc(user.id)
            .update({
              notificationToken: token,
            })
            .then(res.json("tokenAdded"))
            .catch(res.json("Error in token"));
      });
    })
    .catch((error) => {
      res.json(error.message);
    });
});
module.exports = router;
