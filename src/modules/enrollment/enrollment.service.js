const Enrollment = require("../../models/enrollment.model");

const Course = require("../../models/course.model");

const enrollCourseService = async (courseId, user) => {

    // Check Course Exists
    const course = await Course.findById(courseId);

    if (!course) {

        throw new Error("Course not found");

    }

    // Prevent Instructor Self Enrollment
    if (
        course.instructor.toString() === user._id.toString()
    ) {

        throw new Error(
            "Instructor cannot enroll in own course"
        );

    }

    // Check Existing Enrollment
    const existingEnrollment =
        await Enrollment.findOne({
            student: user._id,
            course: courseId
        });

    if (existingEnrollment) {

        throw new Error("Already enrolled");

    }

    // Create Enrollment
    const enrollment = await Enrollment.create({
        student: user._id,
        course: courseId
    });

    return enrollment;

};

const getEnrolledCoursesService = async (userId) => {

    const enrollments = await Enrollment.find({
        student: userId
    })
        .populate({
            path: "course",
            populate: {
                path: "instructor",
                select: "name email role"
            }
        });

    return enrollments;

};

module.exports = {
    enrollCourseService,
    getEnrolledCoursesService
};