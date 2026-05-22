const asyncHandler = require("../../utils/asyncHandler");

const {
    updateProgressService
} = require("./progress.service");

const updateProgressController =
    asyncHandler(async (req, res) => {

        const progress =
            await updateProgressService(
                req.params.courseId,
                req.body.completedLessons,
                req.user
            );

        res.status(200).json({
            success: true,
            message: "Progress updated successfully",
            data: progress
        });

    });

module.exports = {
    updateProgressController
};