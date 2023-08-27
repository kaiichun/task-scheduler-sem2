const express = require("express");
const router = express.Router();

const Task = require("../models/task");

router.get("/", async (request, response) => {
  try {
    const { status, priority, category } = request.query;
    let filter = {};
    if (status || priority || category) {
      if (status) {
        filter.status = status;
      }
      if (priority) {
        filter.priority = priority;
      }
      if (category) {
        filter.category = category;
      }
    }

    response.status(200).send(await Task.find(filter));
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const data = await Task.findOne({ _id: request.params.id });
    response.status(200).send(data);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

router.post("/", async (request, response) => {
  try {
    const newTask = new Task({
      title: request.body.title,
      description: request.body.description,
      dueDate: request.body.dueDate,
      status: request.body.status,
      priority: request.body.priority,
      category: request.body.category,
    });
    await newTask.save();
    response.status(200).send(newTask);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

router.put("/:id", async (request, response) => {
  try {
    const task_id = request.params.id;
    const updatedTask = await Task.findByIdAndUpdate(task_id, request.body, {
      runValidators: true,
      new: true,
    });
    response.status(200).send(updatedTask);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const task_id = request.params.id;
    const deletedTask = await Task.findByIdAndDelete(task_id);
    response.status(200).send(deletedTask);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

router.put("/:id/complete", async (request, response) => {
  try {
    const task_id = request.params.id;
    const completedTask = await Task.findByIdAndUpdate(
      task_id,
      {
        status: [3],
      },
      {
        new: true,
      }
    );
    response.status(200).send(completedTask);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

module.exports = router;
