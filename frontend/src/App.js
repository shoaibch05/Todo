import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./component/TaskList";
import EditTask from "./component/EditTasks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </Router>
  );
}

export default App;
