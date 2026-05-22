const asyncHandler = require("../../utils/asyncHandler");

const {
    registerService, loginService, getProfileService, verifyOtpService, refreshTokenService
} = require("./auth.service");

const registerController = asyncHandler(async (req, res) => {

    const user = await registerService(req.body);

    res.status(201).json({
        success: true,
        message: "User Registered Successfully",
        data: user
    });

});

const loginController = asyncHandler(async (req, res) => {

    const result = await loginService(req.body);

    res.status(200).json({
        success: true,
        message: "Login Successful",
        data: result
    });

});

const getProfileController = asyncHandler(async (req, res) => {

    const user = await getProfileService(req.user._id);

    res.status(200).json({
        success: true,
        message: "Profile fetched successfully",
        data: user
    });

});

const verifyOtpController = asyncHandler(async (req, res) => {

        const { email, otp } = req.body;

        await verifyOtpService(email, otp);

        res.status(200).json({

            success: true,

            message:
                "OTP verified successfully"

        });

    });

const refreshTokenController =
    asyncHandler(async (req, res) => {

        const { refreshToken } = req.body;

        const token =
            await refreshTokenService(
                refreshToken
            );

        res.status(200).json({

            success: true,

            message:
                "Access token refreshed",

            data: token

        });

    });

module.exports = {

    registerController,

    loginController,

    getProfileController,

    verifyOtpController,

    refreshTokenController

};