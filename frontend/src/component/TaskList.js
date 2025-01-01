import React, { useState, useEffect } from "react";
import { fetchtasks, AddTodo, DelTodo, EditTodo } from "../services/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch tasks on initial render
  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchtasks();
        setTasks(data);
        console.log("Fetched tasks:", data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks();
  }, []);

  // Add a new task
  const addTask = async () => {
    if (taskName.trim()) {
      try {
        const res = await AddTodo(taskName);
        setTasks([...tasks, { id: res.id, name: res.name }]);
        setTaskName("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await DelTodo(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Edit a task
  const editTask = async (id, editedName) => {
    try {
      await EditTodo(id, editedName);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, name: editedName } : task
        )
      );
      setEditingId(null); // Exit editing mode
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  // Start editing mode
  const startEditing = (task) => {
    setEditingId(task.id);
    setEditedName(task.name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Todo List</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Add new task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md shadow-sm"
            >
              {editingId === task.id ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-2 py-1 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => editTask(task.id, editedName)}
                    className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <span className="text-gray-800">{task.name}</span>
              )}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => startEditing(task)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
