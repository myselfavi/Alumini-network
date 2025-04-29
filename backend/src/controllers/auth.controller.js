const UserModel = require("../models/user.model");
const {generateToken, verifyToken} = require("../utils/jwt.util");


exports.getMe = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send({message: "User not found"});
        }
        res.json({
            status: "success", message: "User found", data: {
                user: {id: user._id, name: user.name, type: user.type, email: user.email}
            }
        });
    } catch (error) {
        res.status(400).send(error);
    }
};


exports.loginUser = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email,
            password: req.body.password
        });
        if (!user) {
            return res.status(401).send({message: "Invalid email or password"});
        }
        const token = await generateToken({id: user._id, email: user.email});
        res.json({status: "success", message: "User logged in successfully", data: {user, token}});
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.registerUser = async (req, res) => {
    try {
        const user = new UserModel(req.body);
        await user.save();
        const token = await generateToken({id: user._id, email: user.email});
        res.json({status: "success", message: "User registered successfully", data: {user, token}});
    } catch (error) {
        res.status(400).send(error);
    }
};