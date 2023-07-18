const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        studentId: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        semester: {
            type: String,
            required: true,
        },
        session: {
            type: String,
            required: true,
        },
        imagePath: {
            type: String,
            default: null,
        },
        address: {
            type: String,
            default: null,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        fatherName: String,
        motherName: String,
        guardianName: String,
        village: String,
        postOffice: String,
        subDistrict: String,
        district: String,
        nationality: String,
        religion: String,
        hallName: String,
        birthDate: Date,
        academicInfo: [
            {
                examName: String,
                passingYear: Number,
                institute: String,
                board: String,
                examRoll: String,
                GPA: String,
            },
        ],
        courses: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Course",
            },
        ],
        participatedExams: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Examination"
            }
        ]
    },
    {
        timestamps: true,
    }
);

const Student = mongoose.model("Student", userSchema);

module.exports = Student;
