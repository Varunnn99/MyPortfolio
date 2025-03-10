const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false, // ✅ Fix for "self-signed certificate in certificate chain"
    },
});


router.post("/", async (req, res) => {
    const { first_name, last_name, email, phone_number, topic, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.RECEIVER_EMAIL,
            subject: `New Contact Form Submission - ${topic}`,
            text: `Name: ${first_name} ${last_name}\nEmail: ${email}\nPhone: ${phone_number}\nMessage: ${message}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

module.exports = router;
