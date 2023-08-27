const express = require("express");
const router = express.Router();

// import model into router
const Category = require("../models/category");

/* list all the Tasks */
router.get("/", async (request, response) => {
  try {
    const { title } = request.query;
    let filter = {};
    if (title) {
      filter.title = title;
    }
    response.status(200).send(await Category.find().populate("tasks"));
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

router.post("/", async (request, response) => {
  try {
    const newCategory = new Category({
      name: request.body.name,
    });
    await newCategory.save();
    response.status(200).send(newCategory);
  } catch {
    response.status(400).send({ message: error._message });
  }
});

module.exports = router;
