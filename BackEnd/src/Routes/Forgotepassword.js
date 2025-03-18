import express from 'express';
import UserModel from '../Models/User.model.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs';
import 'dotenv/config'

const userforgotpassword = express.Router();

userforgotpassword.post("/forgotpassword", async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "User not found." });

        const token = jwt.sign({ userId: user_id }, process.env.JWT_SECRET, { expiresIn: "10m", });

        const trasporter = nodemailer.createTransport({
            service: "gamil",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: "Reset Password",
            text: `Please use the following link to reset your password: \n\n http://localhost:3000/resetpassword/${token}`
        };

        trasporter.sendMail(mailOptions, (err, info) => {
            if (err) return res.status(500).json({ message: "Failed to send email." });
            res.status(200).json({ message: "Email sent successfully. Please check your inbox." });
        })
    } catch (error) {
        res.status(500).send({ message: err.message });
    }
})

userforgotpassword.post("/reset-password/:token", async (req, res) => {
    try {
        const decoded = jwt.verify(
            req.params.token,
            process.env.JWT_SECRET
        )

        if (!decoded) {
            return res.status(400).json({ message: "Token expired or invalid." });
        }

        const user = await UserModel.findOne({ _id: decoded.userId });
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        const salt = await bcrypt.genSalt(10);
        req.body.newpassword = await bcrypt.hash(req.body.newpassword, salt);

        UserModel.password = req.body.newpassword;
        await user.save();

        res.status(200).json({ message: "Password reset successfully." });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
})


