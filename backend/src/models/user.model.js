const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["student", "alumni"],
        required: true
    },
    name: {
        type: String,
        required: function () {
            return this.type === "student" || this.type === "alumni";
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        required: function () {
            return this.type === "student";
        }
    },
    workExperience: {
        type: Number,
        required: function () {
            return this.type === "alumni";
        }
    },
    organization: {
        type: String,
        required: function () {
            return this.type === "alumni";
        }
    },
    phone: {
        type: String,
        required: function () {
            return this.type === "alumni";
        }
    }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;