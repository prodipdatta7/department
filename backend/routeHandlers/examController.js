const Examination = require("../models/examModel");

async function getExams(req, res) {
    try {
        const exams = await Examination.find(req.query);
        if (exams) {
            res.status(200).json({ success: true, examList: exams });
        } else {
            res.status(204).json({ success: false, message: "No data found." });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
}

async function getExamById(req, res) {
    try {
        const selectedExam = await Examination.findById(req.params.id).populate("courses");
        if (selectedExam) {
            res.status(200).json({ success: true, exam: selectedExam });
        } else {
            res.status(204).json({ success: false, message: "No data found." });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
}

async function createNewExam(req, res) {
    try {
        const exam = new Examination(req.payload);
        const response = await exam.save();
        if (!response) {
            res.status(500).json({
                success: false,
                message: "There are some issues in creating.",
            });
        } else {
            res.status(200).json({
                success: true,
                data: response,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
}

async function updateSelectedExam(req, res) {
    try {
        const exam = await Examination.findByIdAndUpdate(req.params.id, req.payload, { new: true });
        if (!exam) {
            res.status(404).json({
                success: false,
                message: "There are some issues in updating. ID might be incorrect.",
            });
        } else {
            res.status(200).json({
                success: true,
                exam: exam,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
}

module.exports = {
    getExams,
    getExamById,
    createNewExam,
    updateSelectedExam,
};
