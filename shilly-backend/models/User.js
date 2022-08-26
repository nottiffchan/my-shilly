const mongoose = require("mongoose");
const crypto = require("crypto")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, "Please provide valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: 6,
        select: false
    },
    role: {
        // 0 for Shiller, 1 for Token
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    location: { type: String },
    tokenCategory: {
        // 1 for BSC, 2 for ETH, 3 for Memes, 4 for Misc.
        type: Number
    },
    bio: { type: String },
    about: { type: String },
    website: { type: String },  
    youtubeLink: { type: String },
    tiktokUsername: { type: String },
    instagramUsername: { type: String },
    twitterUsername: { type: String },
    telegramChannelLink: { type: String },
    profileImage: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {timestamps: true});

UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
});

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.getSignedToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
}

UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hash token (private key) and save to database
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    // Set token expire date
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
  
    return resetToken;
};

UserSchema.methods.likeUser = function(id) {
    if (this.likes.indexOf(id) === -1) {
        this.likes.push(id);
    }
    return this.save();
}

UserSchema.methods.unlikeUser = function(id) {
    this.likes.remove(id);
    return this.save();
}

UserSchema.methods.hasLiked = function(id){
    const inArray = (currId) => id == currId;
    return (this.likes.some(inArray));
};

const User = mongoose.model("User", UserSchema);

module.exports = User;