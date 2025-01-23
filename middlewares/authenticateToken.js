const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.locals.user = null;
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedToken;
        res.locals.user = decodedToken;
        next();
    } catch (err) {
        console.error("Token doğrulama hatası:", err);
        res.locals.user = null;
        next();
    }
};

module.exports = authenticateToken;
