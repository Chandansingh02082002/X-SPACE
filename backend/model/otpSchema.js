const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { ObjectId } = mongoose.Schema.Types;

const otpSchema = new mongoose.Schema(
    {
        otp: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        userId: {
            type: ObjectId,
            required: true,
            ref: "Users",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

otpSchema.methods.verifyOtp = async function (otp) {
    return bcrypt.compare(otp, this.otp);
};

otpSchema.pre("save", async function (next) {
    if (this.isModified("otp")) {
        const hashedOtp = await bcrypt.hash(this.otp, 12);
        this.otp = hashedOtp;
    }
    next();
});

const OtpModel = mongoose.model("OTPs", otpSchema);

 module.exports = {OtpModel};
