const User = require("../../models/user.model");
const generateToken = require("../../utils/generateToken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../../utils/sendEmail");
const generateRefreshToken = require("../../utils/generateRefreshToken");

const registerService = async (payload) => {
  const { name, email, password } = payload;

  // Check Existing User
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // OTP Expiry
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  // Create User
  const user = await User.create({
    name,

    email,

    password: hashedPassword,

    otp,

    otpExpiry,
  });

  // Send Email
  await sendEmail(
    email,

    "OTP Verification",

    `Your OTP is ${otp}`,
  );

  user.password = undefined;

  return user;
};

const jwt = require("jsonwebtoken");

const refreshTokenService = async (
    refreshToken
) => {

    if (!refreshToken) {

        throw new Error(
            "Refresh token required"
        );

    }

    // Verify Refresh Token
    const decoded = jwt.verify(

        refreshToken,

        process.env.JWT_REFRESH_SECRET

    );

    // Find User
    const user = await User.findById(
        decoded.id
    );

    if (!user) {

        throw new Error("User not found");

    }

    // Generate New Access Token
    const newAccessToken =
        generateToken(user);

    return {
        accessToken: newAccessToken
    };

};

const loginService = async (payload) => {

  const { email, password } = payload;

  // Find User
  const user = await User.findOne({ email });

  // User Check
  if (!user) {
    throw new Error("User not found");
  }

  // Verification Check
  if (!user.isVerified) {

    throw new Error(
      "Please verify your email first"
    );

  }

  // Password Check
  const isPasswordMatched =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordMatched) {
    throw new Error("Invalid credentials");
  }

  // Generate Access Token
  const token = generateToken(user);

  // Generate Refresh Token
  const refreshToken =
    generateRefreshToken(user);

  user.password = undefined;

  return {
    user,
    token,
    refreshToken,
  };

};

const verifyOtpService = async (email, otp) => {
  // Find User
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  // Already Verified
  if (user.isVerified) {
    throw new Error("User already verified");
  }

  // OTP Check
  if (user.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  // Expiry Check
  if (new Date() > user.otpExpiry) {
    throw new Error("OTP expired");
  }

  // Verify User
  user.isVerified = true;

  user.otp = null;

  user.otpExpiry = null;

  await user.save();

  return user;
};

const getProfileService = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};



module.exports = {
  registerService,

  loginService,

  getProfileService,

  verifyOtpService,

  refreshTokenService,
};
