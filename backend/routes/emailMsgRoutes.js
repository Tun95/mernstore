import express from "express";
import expressAsyncHandler from "express-async-handler";
import EmailMsg from "../models/emailMessaging.js";
import { isAdmin, isAuth } from "../utils.js";
import nodemailer from "nodemailer";

const sendEmailRouter = express.Router();

// Contact Admin
sendEmailRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const { email, name, subject, message } = req.body;
    // Create a nodemailer transport
    const smtpTransport = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Create a mail options object with sender's name and email
    const mailOptions = {
      from: {
        name,
        address: email,
      },
      to: process.env.EMAIL_ADDRESS,
      subject,
      text: message,
    };

    // Send the email
    smtpTransport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email sending error:", error);
        res.status(500).json({ message: "Failed to send email" });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  })
);

//Subscribe to News Letter
sendEmailRouter.post(
  "/subscribe",
  // isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const emailExist = await EmailMsg.findOne({ email: req.body.email });

      if (emailExist) {
        return res.status(400).send({ message: "Email already exists" });
      }

      const subscribe = await EmailMsg.create({
        email: req.body.email,
        //user: req.user._id,
      });

      res.status(200).send({
        message: "You have successfully subscribed to our newsletter",
      });
      console.log(subscribe);
    } catch (error) {
      console.error("Error during subscription:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  })
);

// Unsubscribe from News Letter
sendEmailRouter.post(
  "/unsubscribe",
  expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    const unsubscribedUser = await EmailMsg.findOneAndDelete({ email });
    if (unsubscribedUser) {
      return res
        .status(200)
        .send({ message: "You have successfully unsubscribed" });
    } else {
      return res.status(404).send({ message: "Email not found" });
    }
  })
);

//Fetch All
sendEmailRouter.get(
  "/",
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const subscribers = await EmailMsg.find({}).sort("-createdAt");
      res.send(subscribers);
    } catch (error) {
      res.send(error);
    }
  })
);

//=======
//Delete
//=======
sendEmailRouter.delete(
  "/:id",
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const subscriber = await EmailMsg.findById(req.params.id);

      if (subscriber) {
        await EmailMsg.deleteOne({ _id: req.params.id });
        res.send({ message: "Subscriber Deleted Successfully" });
      } else {
        res.status(404).send({ message: "Subscriber Not Found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  })
);

//Send News Letter email
sendEmailRouter.post(
  "/send",
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { subject, message } = req.body;

    try {
      // Retrieve all email addresses from the database
      const allUsers = await EmailMsg.find({});

      // Extract email addresses into an array
      const mailList = allUsers.map((user) => user.email);

      // Create a SMTP transport for sending emails
      const smtpTransport = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.GMAIL_PASS,
        },
      });

      // Add unsubscribe link to the end of the email message
      const unsubscribeLink = `${process.env.SUB_DOMAIN}/unsubscribe`;
      const shopName = process.env.SHOP_NAME;

      // Your email template
      const emailMessageWithUnsubscribe = `
        <html>
          <head>
            <style>
              /* Add your email styles here */
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>${shopName}</h1>
              </div>
              <div class="content">
                ${message}
              </div>
              <div class="footer">
                <p>If you wish to unsubscribe from our newsletter, <a href="${unsubscribeLink}">click here</a>.</p>
              </div>
              <div class="unsubscribe">
                <p><a href="${unsubscribeLink}">Unsubscribe</a> from our newsletter</p>
              </div>
            </div>
          </body>
        </html>
      `;

      // Configure mail options
      const mailOptions = {
        to: [], // Add your "to" email addresses here if needed
        bcc: mailList, // Use bcc for sending to multiple recipients
        from: `${shopName} ${process.env.EMAIL_ADDRESS}`,
        subject,
        html: emailMessageWithUnsubscribe,
      };

      // Send the email
      await smtpTransport.sendMail(mailOptions);

      // Respond to the client
      res.send("Mail sent to " + mailList);
      console.log("Mail sent to " + mailList);
    } catch (err) {
      console.error(err);
      req.flash(
        "error",
        "We seem to be experiencing issues. Please try again later."
      );
      res.redirect("/");
    }
  })
);

export default sendEmailRouter;
