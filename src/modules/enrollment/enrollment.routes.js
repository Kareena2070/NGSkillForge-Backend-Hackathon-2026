const express = require("express");

const router = express.Router();

const {
    enrollCourseController, getEnrolledCoursesController
} = require("./enrollment.controller");

const authMiddleware = require("../../middleware/auth.middleware");

const roleMiddleware = require("../../middleware/role.middleware");

router.post(
    "/:courseId",
    authMiddleware,
    roleMiddleware("student"),
    enrollCourseController
);

router.get(
    "/my-courses",
    authMiddleware,
    roleMiddleware("student"),
    getEnrolledCoursesController
);

module.exports = router;