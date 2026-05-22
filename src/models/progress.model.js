const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },

    completedLessons: {
        type: Number,
        default: 0
    },

    totalLessons: {
        type: Number,
        default: 10
    },

    completionPercentage: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

const Progress = mongoose.model(
    "Progress",
    progressSchema
);

module.exports = Progress;