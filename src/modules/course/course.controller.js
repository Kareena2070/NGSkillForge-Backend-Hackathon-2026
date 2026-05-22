const asyncHandler = require("../../utils/asyncHandler");

const {
    createCourseService, getCoursesService, getInstructorDashboardService
} = require("./course.service");

const createCourseController = asyncHandler(async (req, res) => {

    const course = await createCourseService(
        req.body,
        req.user
    );

    res.status(201).json({
        success: true,
        message: "Course created successfully",
        data: course
    });

});

const getCoursesController = asyncHandler(async (req, res) => {

    const result = await getCoursesService(req.query);

    res.status(200).json({
        success: true,
        message: "Courses fetched successfully",
        ...result
    });

});

const getInstructorDashboardController = asyncHandler(async (req, res) => {

        const dashboard =
            await getInstructorDashboardService(
                req.user._id
            );

        res.status(200).json({
            success: true,
            message: "Instructor dashboard fetched",
            data: dashboard
        });

    });

module.exports = {
    createCourseController,
    getCoursesController,
    getInstructorDashboardController
};