const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
},{ timestamps: true });

function validateUser(user) {
    const schema = new Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().max(100).required(),   
        password: Joi.string().min(3).max(100).required()
    });

    return schema.validate(user);
}

function validateUpdateUser(user) {
    const schema = new Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().max(100).required(),
    });

    return schema.validate(user);
}

const User = mongoose.model("User", userSchema);

module.exports = { User, validateUser, validateUpdateUser};