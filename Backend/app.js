const express = require("express");
// const session = require("express-session");
const app = express();
const db = require("./db");

const taskRouter = require("./routes/allTasks");

const cors = require("cors");

app.use(express.json());
app.use(cors());
//router
app.use("/tasks", taskRouter);
// app.use(
//   session({
//     secret: "Shoaib",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
