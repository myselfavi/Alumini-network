const UserModel = require("../models/user.model");

exports.getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.json({
      status: "success",
      message: "User found",
      data: {
        user: {
          id: user._id,
          name: user.name,
          type: user.type,
          email: user.email,
        },
      },
    });
  } catch (error) {
    res.status(400).send(error);
  }
};



exports.getAllUsers = async (req, res) => {
  try {
    const { type } = req.query;
    if (!type) {
      return res
        .status(400)
        .send({ message: "Type query parameter is required" });
    }

    const users = await UserModel.find({ type });
    res.json({ status: "success", message: "Users found", data: users });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findByIdAndUpdate({ _id: userId }, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
};
