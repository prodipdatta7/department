function payloadForExamUpdate(req, res, next) {
    const payload = {
        examName: req.body.examName,
        year: req.body.year,
        semester: req.body.semester,
        examDate: req.body.examDate,
        registrationOpenDate: req.body.registrationOpenDate,
        registrationCloseDate: req.body.registrationCloseDate,
        examCentre: req.body.examCentre,
        status: req.body.status,
        courses: req.body.courses,
        registeredStudents: req.body.registeredStudents,
    };
    req["payload"] = payload;
    next();
}

module.exports = payloadForExamUpdate;
