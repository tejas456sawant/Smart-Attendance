/** @format */

const nodemailer = require("nodemailer");
var text = "";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "efaceattendancesystem@gmail.com",
    pass: "face68reco",
  },
});

create_mail = (password, mail) => {
  text =
    "<h1> LoginID : " +
    mail +
    " </h1> <br> <h1> Password : " +
    password +
    " </h1>";
};

send_mail = (mail) => {
  transporter.sendMail(
    {
      from: "Smart Attendance",
      to: mail,
      subject: "Account Created!!!",
      html: text,
    },
    (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    },
  );
};
