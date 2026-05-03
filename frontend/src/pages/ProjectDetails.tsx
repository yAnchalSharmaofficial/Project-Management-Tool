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

    setTimeout(() => {
      setMessage(null);
    }, 2000);

    // clear state so it doesn't persist on refresh
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

    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };
  

  return (
    <Box sx={{ p: 4 }}>

    <Box sx={{ mt: 2, textAlign: "center" }}>
        <PageHeader title="Project Management Tool" />
    </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Project Tasks
        </Typography>

        
        <Button
          variant="contained"
          color="success"
          onClick={() =>
            navigate(`/projects/${id}/tasks/create-task`)
          }
        >
          Create Task
        </Button>
      </Box>

      {message && (
        <Box
          sx={{
            mb: 2,
            p: 2,
            bgcolor: "#e8f5e9",
            color: "#2e7d32",
            borderRadius: 1,
          }}
        >
          {message}
        </Box>
      )}

      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <Button
          variant={status === "all" ? "contained" : "outlined"}
          onClick={() => setStatus("all")}
        >
          All
        </Button>

        <Button
          variant={status === "todo" ? "contained" : "outlined"}
          onClick={() => setStatus("todo")}
        >
          Todo
        </Button>

        <Button
          variant={status === "in-progress" ? "contained" : "outlined"}
          onClick={() => setStatus("in-progress")}
        >
          In Progress
        </Button>

        <Button
          variant={status === "done" ? "contained" : "outlined"}
          onClick={() => setStatus("done")}
        >
          Done
        </Button>
      </Stack>

      <Stack spacing={2}>
        {tasks.length === 0 ? (
          <Typography>No tasks found</Typography>
        ) : (
          tasks.map((t: any) => (
            <Card key={t.id}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="h6">{t.title}</Typography>
                  <Typography variant="body2">{t.description}</Typography>
                  <Typography variant="caption">{t.status}</Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    size="small"
                    onClick={() =>
                      navigate(
                        `/projects/${id}/tasks/edit/${t.id}`
                      )
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    color="error"
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

    </Box>
  );
};

export default ProjectDetails;