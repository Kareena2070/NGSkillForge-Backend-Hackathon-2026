const express = require("express");

const router = express.Router();

const {
    registerController,
    loginController,
    getProfileController,
    verifyOtpController,
    refreshTokenController
} = require("./auth.controller");

const validate = require("../../middleware/validate.middleware");
const authMiddleware = require("../../middleware/auth.middleware");

const {
    registerValidation,
    loginValidation,
    verifyOtpValidation
} = require("./auth.validation");

router.post(
    "/register",
    validate(registerValidation),
    registerController
);

router.post(
    "/login",
    validate(loginValidation),
    loginController
);

router.get(
    "/profile",
    authMiddleware,
    getProfileController
);

router.post(

    "/verify-otp",

    validate(verifyOtpValidation),

    verifyOtpController

);

router.post(
    "/refresh-token",
    refreshTokenController
);
module.exports = router;