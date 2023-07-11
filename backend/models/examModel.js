const mongoose = require("mongoose");

const examModel = mongoose.Schema(
    {
        examName: {
            type: String,
            required: true,
        },
        semester: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        examDate: {
            type: Date,
            required: true,
        },
        registrationOpenDate: {
            type: Date,
            required: true,
        },
        registrationCloseDate: {
            type: Date,
            required: true,
        },
        examCentre: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        courses: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Course",
            },
        ],
    },
    { timestamps: true }
);

const Examination = mongoose.model("Examination", examModel);
module.exports = Examination;
