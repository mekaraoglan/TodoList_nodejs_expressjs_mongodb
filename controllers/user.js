const { User, validateUpdateUser } = require("../models/User");
const jwt = require('jsonwebtoken');
const bcryptjs = require("bcryptjs");

exports.get_profile = async (req, res) => {
        res.render("user/profile", {
            title: "Hesabım"
        });
};

exports.get_profile_edit = async (req, res) => {
    res.render("user/profile-edit", {
        title: "Profilimi Düzenle"
    });
};

exports.put_profile_edit = async (req, res) => {

    const { error } = validateUpdateUser(req.body);

    if (error) {
        console.log(error);
        res.status(500).send("Güncelleme işlemi sırasında hata oluştu.")
    }

    try {

        const user = await User.findById(req.user.userid);

        if (!user) {
            return res.status(404).send("Kullanıcı bulunamadı.");
        }

        if (req.body.email !== user.email) {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).render("user/profile-edit", {
                    title: "Profilimi Düzenle",
                    message: {
                        content: "Bu e-posta adresi başka bir kullanıcı tarafından kullanılıyor.",
                        type: "danger"
                    }
                })
            }
        }

        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;

        await user.save();

        const token = jwt.sign(
            {
                userid: user._id,
                userFirstName: user.firstName,
                userLastName: user.lastName,
                userEmail: user.email
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "72h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });

        return res.status(200).render("user/profile", {
            title: "Hesabım",
            message: {
                content: "Bilgileriniz başarıyla güncellendi.",
                type: "success"
            }
        })

    } catch (err) {
        console.log(err);
        res.status(500).send("Güncelleme işlemi sırasında bir hata oluştu.");
    }
};

exports.get_reset_password = (req, res) => {
    res.render("user/reset-password", {
        title: "Parolamı Güncelle"
    });
}


exports.put_reset_password = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;

    if(newPassword !== confirmPassword) {
        return res.render("user/reset-password", {
            title: "Parolamı Güncelle",
            message: {
                content: "Parolalar eşleşmiyor!",
                type: "danger"
            }
        })
    }

    try {
        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        const user = await User.findById(req.user.userid);
        if(!user) {
            res.status(400).send("Kullanıcı bulunamadı.");
        }
    
        user.password = hashedPassword;

        await user.save();

        return res.status(200).render("user/reset-password", {
            title: "Parolamı Güncelle",
            message: {
                content: "Parolanız başarıyla değiştirildi.",
                type: "success"
            }
        })

    } catch(err) {
        res.status(500).send("Beklenmeyen bir hata oluştu.");
    }

}