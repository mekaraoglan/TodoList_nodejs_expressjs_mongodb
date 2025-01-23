const { User, validateUser } = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.get_login =  (req, res) => {

    if(req.user) {
        return res.redirect("/");
    }

    res.render("auth/login", {
        title: "Kullanıcı Giriş Sayfası"
    });
};

exports.post_login = async (req, res) => {
    const { email, password } = req.body;
    
    try{
        const user = await User.findOne({ email });

        if(!user) {
            return res.render("auth/login", {
                title: "Kullanıcı Giriş Sayfası",
                message: {
                    content: "Bu e-postaya kayıtlı bir kullanıcı bulanamadı.",
                    type: "danger"
                }
            })
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if(!isPasswordValid) {
            return res.render("auth/login", {
                title: "Kullanıcı Giriş Sayfası",
                message: {
                    content: "Şifreniz hatalı, lütfen tekrar deneyiniz.",
                    type: "danger"
                }
            });
        }
            
        const token = jwt.sign(
            { userid: user._id, userFirstName: user.firstName, userLastName: user.lastName, userEmail: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "72h" }
        );
        
        res.cookie("token", token, {
            httpOnly: true,
        });
        
        res.redirect("/");
        
    } catch(err) {
        console.log(err);
        res.render("auth/login", {
            title: "Kullanıcı Giriş Sayfası",
            message: {
                content: "Giriş işlemi sırasında bir hata oluştu",
                type: "danger"
            }
        });
    }
};

exports.get_register =  (req, res) => {
    res.render("auth/register", {
        title: "Kayıt Ol"
    });
};

exports.post_register = async (req, res) => {
    const { error } = validateUser(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const existingEmail = await User.findOne({ email:req.body.email });
    
    if(existingEmail) {
        return res.render("auth/register", {
            title: "Kayıt Ol",
            message: {
                content: "Bu e-mail adresi zaten kayıtlı.",
                type: "danger"
            }
        });
    }

    const hashedPassword = await bcryptjs.hash(req.body.password, 10);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        await user.save();
        res.render("auth/login", {
            title: "Kullanıcı Giriş Sayfası",
            message: {
                content: "Hesabınız oluşturuldu, giriş yapabilirsiniz.",
                type: "success"
            }});
    } catch(err) {
        res.status(500).send("Kayıt işlemi sırasında bir hata oluştu.");
    }
        
};

exports.get_logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).redirect("/");
};