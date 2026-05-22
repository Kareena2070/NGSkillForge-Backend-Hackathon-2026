const express = require("express");

const router = express.Router();

const {
    createCourseController, getCoursesController, getInstructorDashboardController
} = require("./course.controller");

const authMiddleware = require("../../middleware/auth.middleware");

const roleMiddleware = require("../../middleware/role.middleware");

const validate = require("../../middleware/validate.middleware");

const upload = require("../../middleware/upload.middleware");

const {
    createCourseValidation
} = require("./course.validation");

router.post(
    "/",
    validate(createCourseValidation),
    authMiddleware,
    roleMiddleware("instructor", "admin"),
    createCourseController
);

router.get(
    "/",
    getCoursesController
);

router.post(
    "/upload-thumbnail",
    authMiddleware,
    roleMiddleware("instructor", "admin"),
    upload.single("thumbnail"),
    (req, res) => {

        res.status(200).json({
            success: true,
            message: "Thumbnail uploaded successfully",
            file: req.file
        });

    }
);

router.get(
    "/instructor/dashboard",
    authMiddleware,
    roleMiddleware("instructor", "admin"),
    getInstructorDashboardController
);

module.exports = router;