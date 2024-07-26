const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.methods.verifyPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
    }
    next();
});

const UserModel = mongoose.model("Users", userSchema);

module.exports = {UserModel};
