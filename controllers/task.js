const { Task, validateTask } = require("../models/Task");

exports.get_task = async (req, res) => {

    try {

        const tasks = await Task.find({ userId: req.user.userid });

        res.render("task/task", {
            title: "Görevlerim",
            tasks: tasks
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Veritabanından görevler alınırken bir hata oluştu.");
    }

};

exports.post_task = async (req, res) => {
    const { error } = validateTask(req.body);
    const userId = req.user.userid;

    if (error) {
        return res.status(400).send(error.details[0].message);
    }


    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        userId: userId
    });

    try {
        await task.save();
        res.redirect("/task");
    } catch (err) {
        console.error("Hata Detayı:", err);
        res.status(500).send("Kayıt işlemi sırasında bir hata oluştu.")
    }
}

exports.delete_task = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.taskid);

    if (!task) {
        return res.status(400).send("Aradığınız ürün bulunamadı.");
    }

    res.redirect("/task");
}

exports.put_task = async (req, res) => {
    const task = await Task.findById(req.params.taskid);
    const isCompleted = !task.isCompleted;

    if (!task) {
        return res.status(400).send("Aradığınız ürün bulunamadı.");
    }

    try {

        task.isCompleted = isCompleted;
        await task.save();

        res.redirect("/task")
    } catch (err) {
        console.log(err);
    }
};

exports.get_task_edit = async (req, res) => {
    const taskid = req.params.taskid;

    try {
        const task = await Task.findById(taskid);

        res.render("task/task-edit", {
            title: "Görevi Düzenle",
            task: task
        })
    } catch (err) {
        console.log(err);
    }
};

exports.post_task_edit = async (req, res) => {
    const { error } = validateTask(req.body);

    if (error) {
        res.status(400).send("Görev güncellenirken hata oluştu.");
    }

    const taskid = req.params.taskid;
    const task = await Task.findById(taskid);

    try {
        task.title = req.body.title;
        task.description = req.body.description;

        await task.save();
        res.redirect("/task")
    } catch (err) {
        console.log(err);
    }
}
