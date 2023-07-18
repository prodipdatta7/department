function createPayload(req, res, next) {
    console.log("createPayload middleware", req.file, req.body);
    const url = req.protocol + "://" + req.get("host");
    let imagePath = null;
    if (req?.file?.filename) {
        imagePath = url + "/images/" + req.file.filename;
    }
    const payload = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        studentId: req.body.studentId,
        department: req.body.department,
        address: req.body.address,
        semester: req.body.semester,
        session: req.body.session,
        isAdmin: req.body.isAdmin,
        fatherName: req.body.fatherName,
        motherName: req.body.motherName,
        guardianName: req.body.guardianName,
        village: req.body.village,
        postOffice: req.body.postOffice,
        subDistrict: req.body.subDistrict,
        district: req.body.district,
        nationality: req.body.nationality,
        religion: req.body.religion,
        hallName: req.body.hallName,
        birthDate: req.body.birthDate,
        academicInfo: req.body.academicInfo,
        courses: req.body.courses,
        participatedExams: req.body.participatedExams
    };
    if(imagePath)Object.assign(payload, {imagePath: imagePath});
    console.table(payload);
    req["payload"] = payload;
    next();
}

module.exports = createPayload;
