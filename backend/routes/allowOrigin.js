function allowOrigin(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}

module.exports = allowOrigin;