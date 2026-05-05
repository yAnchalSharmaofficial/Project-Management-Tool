// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../api/axios";
// import PageHeader from "./PageHeader";

// import {
//   Box,
//   TextField,
//   Button,
//   MenuItem,
//   Paper,
//   Typography,
// } from "@mui/material";

// const TaskForm = () => {
//   const { taskId , id:projectId} = useParams();
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState("todo");
//   const [dueDate, setDueDate] = useState("");

  
//   useEffect(() => {
//     const fetchTask = async () => {
//       if (taskId) {
//         const res = await API.get(`/tasks/${taskId}/`);
//         const t = res.data;

//         setTitle(t.title || "");
//         setDescription(t.description || "");
//         setStatus(t.status || "todo");
//         setDueDate(t.due_date || "");
//       }
//     };

//     fetchTask();
//   }, [taskId]);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     const payload = {
//       title,
//       description,
//       status,
//       due_date: dueDate,
//       project: projectId,
//     };

//     if (taskId) {
//         await API.put(`/tasks/${taskId}/`, payload);

//         navigate(`/projects/${projectId}`, {
//             state: { message: "Task updated successfully" },
//         });

//         } else {
//         await API.post("/tasks/", payload);

//         navigate(`/projects/${projectId}`, {
//             state: { message: "Task created successfully" },
//         });
//     }   
//   };

//   return (
//     <Paper sx={{ p: 3, mb: 3 }} elevation={2}>
//     <Box sx={{ mt: 2, textAlign: "center" }}>
//       <PageHeader title="Project Management Tool" />
//     </Box>
//       <Typography variant="h6" sx={{ mb: 2,fontWeight:"bold" }}>
//         {taskId ? "Update Task" : "Create Task"}
//       </Typography>

//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//       >
//         <TextField
//           label="Task Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           fullWidth
//         />

//         <TextField
//           label="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           fullWidth
//           multiline
//           rows={3}
//         />

//         <TextField
//           select
//           label="Status"
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           fullWidth
//         >
//           <MenuItem value="todo">Todo</MenuItem>
//           <MenuItem value="in-progress">In Progress</MenuItem>
//           <MenuItem value="done">Done</MenuItem>
//         </TextField>

//         <TextField
//             type="date"
//             label="Due Date"
//             value={dueDate}
//             onChange={(e) => setDueDate(e.target.value)}
//             fullWidth
//             slotProps={{
//                 inputLabel: {
//                 shrink: true,
//                 },
//             }}
//             />

//         <Button type="submit" variant="contained" color="success">
//           {taskId ? "Update Task" : "Create Task"}
//         </Button>
//       </Box>
//     </Paper>
//   );
// };

// export default TaskForm;



import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import PageHeader from "./PageHeader";

import {
  Box,
  TextField,
  Button,
  MenuItem,
  Container,
} from "@mui/material";

const TaskForm = () => {
  const { taskId, id: projectId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      if (taskId) {
        const res = await API.get(`/tasks/${taskId}/`);
        const t = res.data;

        setTitle(t.title || "");
        setDescription(t.description || "");
        setStatus(t.status || "todo");
        setDueDate(t.due_date || "");
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      status,
      due_date: dueDate,
      project: projectId,
    };

    if (taskId) {
      await API.put(`/tasks/${taskId}/`, payload);
    } else {
      await API.post("/tasks/", payload);
    }

    navigate(`/projects/${projectId}`, {
      state: {
        message: taskId
          ? "Task updated successfully"
          : "Task created successfully",
      },
    });
  };

  return (
    <Container maxWidth="sm">
      <PageHeader title={taskId ? "Update Task" : "Create Task"} />

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
      >
        <TextField
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          size="small"
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
          size="small"
        />

        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
          size="small"
        >
          <MenuItem value="todo">Todo</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </TextField>

        <TextField
          type="date"
          label="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          fullWidth
          size="small"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 1,
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 1,
          }}
        >
          {taskId ? "Update Task" : "Create Task"}
        </Button>
      </Box>
    </Container>
  );
};

export default TaskForm;