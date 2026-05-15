const Course = require("../models/course.model");

const asyncHandler = require("../utils/asyncHandler");

const createCourse = asyncHandler(async (req, res) => {

    const { title, description } = req.body;

    if (!title || !description) {

        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });

    }

    const course = await Course.create({
        title,
        description,
        instructor: req.user.id
    });

    res.status(201).json({
        success: true,
        message: "Course Created Successfully",
        data: course
    });

});

const getCourses = asyncHandler(async (req, res) => {

    const courses = await Course.find()
        .populate("instructor", "name email role");

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    });

});

const getSingleCourse = asyncHandler(async (req, res) => {

    const course = await Course.findById(req.params.id)
        .populate("instructor", "name email");

    if (!course) {

        return res.status(404).json({
            success: false,
            message: "Course not found"
        });

    }

    res.status(200).json({
        success: true,
        data: course
    });

});

const updateCourse = asyncHandler(async (req, res) => {

    const course = await Course.findById(req.params.id);

    if (!course) {

        return res.status(404).json({
            success: false,
            message: "Course not found"
        });

    }

    // Ownership Check
    if (
        course.instructor.toString() !== req.user.id &&
        req.user.role !== "admin"
    ) {

        return res.status(403).json({
            success: false,
            message: "You can update only your own courses"
        });

    }

    const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).json({
        success: true,
        message: "Course Updated Successfully",
        data: updatedCourse
    });

});

const deleteCourse = asyncHandler(async (req, res) => {

    const course = await Course.findById(req.params.id);

    if (!course) {

        return res.status(404).json({
            success: false,
            message: "Course not found"
        });

    }

    // Ownership/Admin Check
    if (
        course.instructor.toString() !== req.user.id &&
        req.user.role !== "admin"
    ) {

        return res.status(403).json({
            success: false,
            message: "You can delete only your own courses"
        });

    }

    await Course.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Course Deleted Successfully"
    });

});
module.exports = {
    createCourse, getCourses, getSingleCourse, updateCourse, deleteCourse
};