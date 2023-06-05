const mongoose = require('mongoose');

const courseModel = mongoose.Schema(
    {
        courseName: {
            type: String,
            required: true,
        },
        courseCode: {
            type: String,
            required: true,
        },
        courseContactHours: {
            type: Number,
            required: true,
        },
        courseCredits: {
            type: Number,
            required: true,
        },
        courseCoverageDepartment: {
            type: String,
            required: true,
        },
        courseCoverageSemester: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Course = mongoose.model('Course', courseModel);
module.exports = Course;
