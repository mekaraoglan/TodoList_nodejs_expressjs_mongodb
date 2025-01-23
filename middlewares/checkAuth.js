const checkAuth = (req, res, next) => {
    if(!req.user) {
        res.render("auth/login", {
            title: "Kullanıcı Giriş Sayfası",
            message: {
                content: "Sayfaya erişmek için lütfen giriş yapın.",
                type: "danger"
            }
        });
        return;
    }
    next();
}

module.exports = checkAuth;