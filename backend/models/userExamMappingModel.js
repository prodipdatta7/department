const mongoose = require("mongoose");

const UserExamMappingSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Student'
        },
        exam: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Examination'
        },
        filePath: String
    },
    {
        timestamps: true
    }
);

const UserExamMapping = mongoose.model("UserExamMapping", UserExamMappingSchema);

module.exports = UserExamMapping;
