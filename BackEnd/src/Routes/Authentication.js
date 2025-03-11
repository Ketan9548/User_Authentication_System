import express from 'express';
import UserModel from '../Models/User.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config'


const userauthentiucation = express.Router();


const passwordvalidation = (password) => {
    const minlength = 8;
    const regx = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/'

    if (password.length < minlength) {
        return "Password should be at least 8 characters long.";
    }

    if (!regx.test(password)) {
        return "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    return null;
}

userauthentiucation.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const exituser = await UserModel.findOne({ email });
        if (exituser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const passwordcheck = passwordvalidation(password);
        if (passwordcheck) {
            return res.status(400).json({ msg: passwordcheck });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newuser = await UserModel.create({ username, email, password: hashedPassword });
        await newuser.save();
        res.status(200).json({ msg: 'User created successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error", error });
    }
})


userauthentiucation.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid password' });
        }

        const token = jwt.sign({ id: UserModel._id, username: UserModel.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
})

export default userauthentiucation;