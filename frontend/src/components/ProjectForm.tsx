// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
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

// const ProjectForm = () => {

//   const navigate = useNavigate(); 
//   const { id } = useParams(); 

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState("active");


//   useEffect(() => {
//     const fetchProject = async () => {
//       if (id) {
//         const res = await API.get(`/projects/${id}/`);
//         setTitle(res.data.title);
//         setDescription(res.data.description);
//         setStatus(res.data.status);
//       }
//     };

//     fetchProject();
//   }, [id]);



//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     const payload = { title, description, status };

//     if (id) {
//       await API.put(`/projects/${id}/`, payload); 
//     } else {
//       await API.post("/projects/", payload); 
//     }

//     setTitle("");
//     setDescription("");
//     setStatus("active");

//     navigate("/dashboard", {
//       state: {
//         message: id
//           ? "Project updated successfully"
//           : "Project created successfully",
//       },
//     });  
//   };

//   return (
//     <Paper sx={{ p: 3 }} elevation={2}>

//     <Box sx={{ mt: 2, textAlign: "center" }}>
//       <PageHeader title="Project Management Tool" />
//     </Box>
//       <Typography variant="h6" sx={{ mb: 2 , fontWeight:"bold"}}>
//         {id ? "Update Project" : "Create Project"}
//       </Typography>

//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//       >
//         <TextField
//           label="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           fullWidth
//         />

//         <TextField
//           label="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           fullWidth
//         />

//         <TextField
//           select
//           label="Status"
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           fullWidth
//         >
//           <MenuItem value="active">Active</MenuItem>
//           <MenuItem value="completed">Completed</MenuItem>
//         </TextField>

//         <Button type="submit" color="success" variant="contained">
//           {id ? "Update Project" : "Create Project"}
//         </Button>
//       </Box>
//     </Paper>
//   );
// };

// export default ProjectForm;


import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import PageHeader from "./PageHeader";

import {
  Box,
  TextField,
  Button,
  MenuItem,
  Paper,
  // Typography,
  Container,
} from "@mui/material";

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        const res = await API.get(`/projects/${id}/`);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setStatus(res.data.status);
      }
    };

    fetchProject();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = { title, description, status };

    if (id) {
      await API.put(`/projects/${id}/`, payload);
    } else {
      await API.post("/projects/", payload);
    }

    navigate("/dashboard", {
      state: {
        message: id
          ? "Project updated successfully"
          : "Project created successfully",
      },
    });
  };

  return (
    <Container maxWidth="sm">
      <PageHeader title={id ? "Update Project" : "Create Project"} />

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          mt: 2,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Project Title"
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
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>

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
            {id ? "Update Project" : "Create Project"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProjectForm;