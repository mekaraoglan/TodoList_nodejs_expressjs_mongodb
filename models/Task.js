const mongoose = require("mongoose");
const Joi = require("joi");

const taskSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    isCompleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

function validateTask(task) {
    const schema = new Joi.object({
    title: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(2).max(1500).required(),
    });

    return schema.validate(task);
}

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task, validateTask };