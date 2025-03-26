import express from 'express';
import UserModel from '../Models/User.model.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const userforgotpassword = express.Router();

userforgotpassword.post("/forgotpassword", async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "User not found." });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "10m" });

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: "Reset Password Your password",
            text: `Please use the following link to reset your password also link will we expire in 10 minute : \n\n http://localhost:4000/restartpassword/${token}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully. Please check your inbox." });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

userforgotpassword.post("/reset-password/:token", async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(400).json({ message: "Token expired or invalid." });
        }

        const user = await UserModel.findById(decoded.userId);
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.newpassword, salt);

        await user.save();

        res.status(200).json({ message: "Password reset successfully." });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

export default userforgotpassword;
