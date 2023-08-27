const express = require("express");
const mongoose = require("mongoose");

// create an instance of express
const app = express();

// middleware to handle JSON request
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/taskscheduler")
  .then(() => console.log("MongoDB Connected Success..."))
  .catch((err) => console.log(err));

// routes
const taskRouter = require("./routes/task");
const categoryRouter = require("./routes/category");

app.use("/tasks", taskRouter);
app.use("/categories", categoryRouter);

app.get("/", (request, response) => {
  response.send(
    "<a href='/tasks'>Tasks</a> <br/> <a href='/categories'>Category</a>"
  );
});

app.listen(9999, () => {
  console.log("Server is running on port 9999");
});
