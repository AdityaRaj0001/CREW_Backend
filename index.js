const express = require("express");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require('fs');
require("dotenv").config();


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/sendmail", (req, res) => {
  const source = fs.readFileSync('email.html', 'utf-8').toString();
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  let recipient = req.body.recipient;

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: recipient,
    subject: "Confirmation of Registration - CREW",
    html:source,
  };

  transport.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Error sending email" }); // Send error response
    } else {
      res.status(200).send({ message: "sent successfully" }); // Send success response
    }
  });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
