const mongoose = require('mongoose');

const deptSchema = mongoose.Schema(
    {
        deptName: {
            type: String,
            required: true,
        },
        studentId : {
            type: String,
            required: true,
        },
        fathersName: {
            type: String,
            required: true,
        },
        SSCYear: {
            type: Number,
            required: true,
        },
        HSCYear: {
            type: Number,
            required: true,
        },
        SSCGPA: {
            type: Number,
            required: true,
        },
        HSCGPA: {
            type: Number,
            required: true,
        },
        schoolName: {
            type: String,
            required: true,
        },
        collegeName: {
            type: String,
            required: true,
        },
        schoolBoardName: {
            type: String,
            required: true,
        },
        collegeBoardname: {
            type: String,
            required: true,
        },
        session: {
            type: String,
            required: true,
        },
        class: {
            type: String,
            required: true,
        },
        semester: {
            type: String,
            required: true,
        },
        majorCourses: [
            {
                type: String,
            }
        ],
        nonMajorCourses: [
            {
                type: String,
            }
        ],
    },
    {
        timestamps: true,
    }
)