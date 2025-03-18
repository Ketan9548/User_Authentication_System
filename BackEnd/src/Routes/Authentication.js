import express from 'express';
import UserModel from '../Models/User.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config'


const userauthentiucation = express.Router();


const passwordValidation = (password) => {
    const minLength = 8;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password.length < minLength) {
        return "Password should be at least 8 characters long.";
    }

    if (!regex.test(password)) {
        return "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    return null;
};

userauthentiucation.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const exituser = await UserModel.findOne({ email });
        if (exituser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const passwordcheck = passwordValidation(password);
        if (passwordcheck) {
            return res.status(400).json({ msg: passwordcheck });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newuser = await UserModel.create({ username, email, password: hashedPassword });
        await newuser.save();
        res.status(200).json({ message: 'User created successfully' });
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
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: UserModel._id, username: UserModel.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
})


userauthentiucation.get('/getallusers', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ message: "all users: ", users });
    } catch (error) {
        console.error({ message: "error during the get all the users ", error: error.message });
    }
})

userauthentiucation.get('/users/:username', async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "all users: ", user });
    } catch (error) {
        console.error({ message: "error during the get user by username ", error: error.message });
    }

})

export default userauthentiucation;