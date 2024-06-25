import asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';
import generateToken from '../utils/generateToken.js';

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await user.matchPassword(password)) {
        generateToken(res, user._id);
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            number: user.number,
            image: user.image
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, number, image } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        number,
        image
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            number: user.number,
            image: user.image
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: "User logged out" });
});


const getProfile = asyncHandler(async (req, res) => {
    const { email, name, _id, number, image } = req.user;
    res.status(200).json({ _id, name, email, number, image });
});

const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.number = req.body.number || user.number;
        user.image = req.body.image || user.image;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            number: updatedUser.number,
            image: updatedUser.image
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export {
    authUser,
    registerUser,
    logoutUser,
    getProfile,
    updateProfile
};