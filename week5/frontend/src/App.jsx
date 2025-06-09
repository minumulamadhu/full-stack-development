import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { fetchTasks } from "./api";
import "./styles/App.css";
function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching tasks. Please try again later.");
        setLoading(false);
      }
    };
    getTasks();
  }, []);
  if (loading) return <div className="loading">Loading tasks...</div>;
  if (error) return <div className="error">{error}</div>;
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Task Manager</h1>
        </header>
        <main className="app-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <TaskForm
                    setTasks={setTasks}
                    editingTask={editingTask}
                    setEditingTask={setEditingTask}
                  />
                  <TaskList
                    tasks={tasks}
                    setTasks={setTasks}
                    setEditingTask={setEditingTask}
                  />
                </>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;
