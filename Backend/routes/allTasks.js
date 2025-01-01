const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const query = "SELECT * FROM tasks";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching tasks:", err);
      res.status(500).json({ error: "Error fetching tasks" });
    } else {
      res.json(results);
    }
  });
});

// Add a new task
router.post("/add", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Task name is required" });
  }

  const query = "INSERT INTO tasks (name) VALUES (?)";
  db.query(query, [name], (err, results) => {
    if (err) {
      console.error("Error adding task:", err);
      res.status(500).json({ error: "Error adding task" });
    } else {
      res.status(201).json({ id: results.insertId, name });
    }
  });
});

// Delete a task
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM tasks WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting task:", err);
      res.status(500).json({ error: "Error deleting task" });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(200).json({ message: "Task deleted successfully" });
    }
  });
});

// Update a task (Optional)
router.put("/u/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Task name is required" });
  }

  const query = "UPDATE tasks SET name = ? WHERE id = ?";
  db.query(query, [name, id], (err, results) => {
    if (err) {
      console.error("Error updating task:", err);
      res.status(500).json({ error: "Error updating task" });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(200).json({ message: "Task updated successfully" });
    }
  });
});

module.exports = router;
