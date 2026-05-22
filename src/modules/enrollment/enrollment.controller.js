const asyncHandler = require("../../utils/asyncHandler");

const {
    enrollCourseService, getEnrolledCoursesService
} = require("./enrollment.service");

const enrollCourseController =
    asyncHandler(async (req, res) => {

        const enrollment =
            await enrollCourseService(
                req.params.courseId,
                req.user
            );

        res.status(201).json({
            success: true,
            message: "Course enrolled successfully",
            data: enrollment
        });

    });

const getEnrolledCoursesController =
    asyncHandler(async (req, res) => {

        const enrollments =
            await getEnrolledCoursesService(
                req.user._id
            );

        res.status(200).json({
            success: true,
            message: "Enrolled courses fetched successfully",
            data: enrollments
        });

    });

module.exports = {
    enrollCourseController,
    getEnrolledCoursesController
};