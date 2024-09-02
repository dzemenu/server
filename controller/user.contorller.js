const User = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const Login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: 'Invalid credential' });
    }

    if (! await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credential' });
    }
    const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.SECRET,

    );
    console.log("first", token)
    res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.send({
        message: 'success',
    });
}
const Register = async (req, res) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
    });
    try {
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
const getUsers = async (req, res) => {

    const users = await User.find();
    res.status(200).json(users);
}
module.exports = { Login, Register, getUsers }