const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");
const checkAuth = require("../middlewares/checkAuth");

router.get("/task", checkAuth, taskController.get_task);
router.post("/task", checkAuth, taskController.post_task);
router.post("/task-delete/:taskid", checkAuth, taskController.delete_task);
router.post("/task-completed/:taskid", checkAuth, taskController.put_task);
router.get("/task-edit/:taskid", checkAuth, taskController.get_task_edit);
router.post("/task-edit/:taskid", checkAuth, taskController.post_task_edit);

module.exports = router;