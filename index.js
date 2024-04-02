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
    html:`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
    
      <body
        style="
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          background-color: black;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center !important;
          align-items: center !important;
        "
      >
        <div
          class="container"
          style="width: 100vw; margin: auto;margin-top: 1rem; max-width: 800px; min-height: 100vh;padding-bottom: 4rem;"
        >
          <img
            class="fullimg"
            src="https://res.cloudinary.com/dvc9k0yjr/image/upload/v1711603051/l2_wzjw6o.png"
            style="width: 100%;margin-bottom: 0.5rem;"
          />
          
          <img
            class="fullimg"
            src="https://res.cloudinary.com/dvc9k0yjr/image/upload/v1711603051/llll22_lmd2hp.png"
            style="width: 100%"
          />
          <div class="fulldiv" style="width: 100%; height: auto">
            <h1 style="color: #ebfe54; width: 90%; font-size: 2rem;padding-left: 12px;">Dear User</h1>
            <p style="color: white; width: 90%; font-size: 1.5rem;padding-left: 12px;">
              We wanted to take a moment to express our deepest gratitude for your
              continuous support and for being an integral part of the Crew A
              community. Your enthusiasm and engagement have been truly inspiring,
              and we are incredibly grateful to have you as a member of our gaming
              platform.
            </p>
        
          </div>
          <div
            class="fulldiv hugImagediv"
            style="width: 100%; height: 250px; text-align: center"
          >
            <img
              class="fullimg"
              src="https://res.cloudinary.com/dvc9k0yjr/image/upload/v1711603053/Group_10000026172_ol9ttq.png"
              style="height: 100%"
            />
           
          </div>
          <div
            class="fulldiv"
            style="width: 100%;margin-top: 2rem; background-color: white; height: auto;padding-bottom: 2rem;"
          ><a href="https://www.crewtm.com/" style="height: auto; width: 100%;" target="_blank">
            <img
            class="fullimg"
            src="https://res.cloudinary.com/dvc9k0yjr/image/upload/v1711603050/logoooooo_vkntei.png"
            style="width: 100%"
          />
          </a>
           
            <p
              style="
                width: 100%;
                text-align: center;
                font-size: 1rem;
                color: gray;
                font-weight: 400;
              "
            >
              Follow Us Social Media:
            </p>
            <p style="width: 100%; text-align: center">
              <span
                ><a href="https://instagram.com/crewcasts" target="_blank"
                  ><img
                    alt="Instagram"
                    src="https://res.cloudinary.com/dvc9k0yjr/image/upload/v1711603051/instagram2x_ndcze7.png"
                    style="height: 30px"
                    title="Instagram" /></a
              ></span>
              <span
                ><a href="" target="_blank"
                  ><img
                    alt="LinkedIn"
                    src="https://res.cloudinary.com/dvc9k0yjr/image/upload/v1711603050/linkedin2x_u0q8mg.png"
                    style="height: 30px"
                    title="LinkedIn" /></a
              ></span>
              <span
                ><a href="http://www.youtube.com/@CrewCasts" target="_blank"
                  ><img
                    alt="Youtube"
                    src="https://res.cloudinary.com/dvc9k0yjr/image/upload/v1711603050/youtube2x_n9kfgg.png"
                    style="height: 30px"
                    title="Youtube" /></a
              ></span>
     
            </p>
            <div style="width: 80%; margin:auto; height: 80px; border-top: 1px dashed gray;"></div>
            <p style="text-align: center; width: 100%; font-size: 1rem; margin-bottom: 2px;color: rgb(169, 167, 167);">Where to find us</p>
            <p style="text-align: center; width: 100%; font-size: 0.9rem;margin-top: 2px;"><a href="https://www.crewtm.com/" target="_blank">www.crewtm.com</a></p>
        
            <p style="text-align: center; width: 100%; font-size: 0.8rem;margin-top: 24px; color: gray;">SKDIV © All rights reserved 2024</p>
          
          </div>
        </div>
      </body>
    
    </html>
    `,
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
