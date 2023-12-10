import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TaskForm from "./components/TaskForm";
import { Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskItem from "./components/TaskItem";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<TaskForm />} />
      <Route path="/tasks/list" element={<TaskList />} />
      <Route path="/tasks/item/:id" element={<TaskItem />} />

    </Routes>
  );
}

export default App;
