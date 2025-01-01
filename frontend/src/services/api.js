import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

// Fetch all
export const fetchtasks = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("Fetched tasks:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
//add todo
export const AddTodo = async (taskName) => {
  try {
    const response = await axios.post(API_URL + "/add", { name: taskName });
    console.log("Todo added Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error Adding tasks:", error);
    throw error;
  }
};
export const DelTodo = async (id) => {
  try {
    const response = await axios.delete(API_URL + `/${id}`);
    console.log("Todo Deleted Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error Deleting task:", error);
    throw error;
  }
};
export const EditTodo = async (id, taskName) => {
  try {
    const response = await axios.put(API_URL + `/u/${id}`, { name: taskName });
    console.log("Todo Updated Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error Updating task:", error);
    throw error;
  }
};
