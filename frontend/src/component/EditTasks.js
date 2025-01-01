// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../services/api";

// const EditTask = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [taskName, setTaskName] = useState("");

//   useEffect(() => {
//     const fetchTask = async () => {
//       try {
//         const response = await api.get(`/tasks/${id}`);
//         setTaskName(response.data.name);
//       } catch (error) {
//         console.error("Error fetching task:", error);
//       }
//     };

//     fetchTask();
//   }, [id]);

//   const updateTask = async () => {
//     if (taskName.trim()) {
//       try {
//         await api.put(`/tasks/${id}`, { name: taskName });
//         navigate("/"); // Redirect to task list
//       } catch (error) {
//         console.error("Error updating task:", error);
//       }
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Edit Task</h1>
//       <input
//         type="text"
//         value={taskName}
//         onChange={(e) => setTaskName(e.target.value)}
//       />
//       <button onClick={updateTask}>Update Task</button>
//     </div>
//   );
// };

// export default EditTask;
