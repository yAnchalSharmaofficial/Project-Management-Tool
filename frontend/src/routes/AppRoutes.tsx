import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import ProjectDetails from "../pages/ProjectDetails";
import ProjectForm from "../components/ProjectForm";
import TaskForm from "../components/TaskForm";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login/" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>}/>
        <Route path="/projects/:id" element={<ProjectDetails />} />

        <Route path="/create-project" element={<ProjectForm />} />
        <Route path="/projects/edit/:id" element={<ProjectForm />} />

        <Route path="/projects/:id/tasks/create-task" element={<TaskForm />} />
        <Route path="/projects/:id/tasks/edit/:taskId" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;