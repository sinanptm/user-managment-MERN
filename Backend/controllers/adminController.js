import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import dotenv from 'dotenv';
import User from '../models/userModels.js';

dotenv.config();

const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;


const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = generateToken(res, '23232adminId2223', 'adminToken');
        res.status(200).json({ message: 'Admin authenticated', token });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

const getUserDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(400);
        throw new Error("User no find")
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.image = req.body.image || user.image;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updateUser = await user.save();
        res.status(200).json(updateUser);
    } else {
        res.status(400);
        throw new Error("User no find")
    }
});

const logoutAdmin = asyncHandler(async (req, res) => {
    res.cookie('adminToken', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: "Admin logged out" });
});

export {
    authAdmin,
    getUsers,
    updateUser,
    logoutAdmin,
    getUserDetails
};
