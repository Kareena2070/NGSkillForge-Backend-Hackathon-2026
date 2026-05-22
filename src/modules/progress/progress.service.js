const Progress = require("../../models/progress.model");

const Enrollment = require("../../models/enrollment.model");

const updateProgressService = async (
    courseId,
    completedLessons,
    user
) => {

    // Check Enrollment
    const enrollment = await Enrollment.findOne({
        student: user._id,
        course: courseId
    });

    if (!enrollment) {

        throw new Error(
            "You are not enrolled in this course"
        );

    }

    let progress = await Progress.findOne({
        student: user._id,
        course: courseId
    });

    // Create progress if not exists
    if (!progress) {

        progress = await Progress.create({
            student: user._id,
            course: courseId
        });

    }

    progress.completedLessons = completedLessons;

    progress.completionPercentage =
        (completedLessons / progress.totalLessons) * 100;

    await progress.save();

    return progress;

};

module.exports = {
    updateProgressService
};