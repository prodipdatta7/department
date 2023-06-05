function createPayload(req, res, next) {
    const payload = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        studentId: req.body.studentId,
        department: req.body.department,
        address: req.body.address,
        session: req.body.session,
        isAdmin: req.body.isAdmin,
    };
    req['payload'] = payload;
    next();
}

module.exports = createPayload;
