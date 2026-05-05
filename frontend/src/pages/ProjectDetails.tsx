import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getTasks } from "../api/tasks";
import API from "../api/axios";
import PageHeader from "../components/PageHeader";

import {
  Box,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  Container,
  Chip,
} from "@mui/material";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("all");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks(Number(id), status);
      setTasks(data);
    };

    fetchTasks();
  }, [id, status]);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);

      setTimeout(() => setMessage(null), 2000);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const refreshTasks = async () => {
    const data = await getTasks(Number(id), status);
    setTasks(data);
  };

  const handleDelete = async (taskId: number) => {
    await API.delete(`/tasks/${taskId}/`);

    refreshTasks();
    setMessage("Task deleted successfully");

    setTimeout(() => setMessage(null), 2000);
  };

  const getChipColor = (s: string) => {
    if (s === "done") return "success";
    if (s === "in-progress") return "info";
    return "default";
  };

  return (
    <Box sx={{ background: "#f6f8fa", minHeight: "100vh", py: 3 }}>
      <Container maxWidth="md">
        <PageHeader title="Project Tasks" />

        {/* Header Actions */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Manage all tasks for this project
          </Typography>

          <Button
            variant="contained"
            onClick={() =>
              navigate(`/projects/${id}/tasks/create-task`)
            }
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Create Task
          </Button>
        </Box>

        {message && (
          <Box
            sx={{
              mb: 2,
              p: 1.5,
              bgcolor: "#e8f5e9",
              color: "#2e7d32",
              borderRadius: 1,
              fontSize: "14px",
            }}
          >
            {message}
          </Box>
        )}

        
        <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap" }}>
          {["all", "todo", "in-progress", "done"].map((s) => (
            <Button
              key={s}
              variant={status === s ? "contained" : "outlined"}
              onClick={() => setStatus(s)}
              sx={{ textTransform: "none" }}
            >
              {s.toUpperCase()}
            </Button>
          ))}
        </Stack>

        
        <Stack spacing={2}>
          {tasks.length === 0 ? (
            <Typography color="text.secondary">
              No tasks found
            </Typography>
          ) : (
            tasks.map((t: any) => (
              <Card
                key={t.id}
                sx={{
                  borderRadius: 2,
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {t.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {t.description}
                    </Typography>

                    <Chip
                      label={t.status}
                      size="small"
                      color={getChipColor(t.status)}
                      sx={{ mt: 1 }}
                    />
                  </Box>

                  
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      size="small"
                      sx={{ textTransform: "none" }}
                      onClick={() =>
                        navigate(`/projects/${id}/tasks/edit/${t.id}`)
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      size="small"
                      color="error"
                      sx={{ textTransform: "none" }}
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default ProjectDetails;
