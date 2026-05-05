// import { useEffect, useState } from "react";
// import { getProjects } from "../api/projects";
// import { useNavigate, useLocation } from "react-router-dom";
// import API from "../api/axios";
// import PageHeader from "../components/PageHeader";

// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   TextField,
// } from "@mui/material";

// // import ProjectForm from "../components/ProjectForm";



// const Dashboard = () => {
//   const [projects, setProjects] = useState([]);
//   const [message, setMessage] = useState<string | null>(null);


//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [totalPages, setTotalPages] = useState(1);

//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getProjects(page, search);
//        setProjects(data.results);
//        setTotalPages(Math.ceil(data.count / 5));
//     };

//     fetchData();
//   }, [page, search]);

//    useEffect(() => {
//     if (location.state?.message) {
//       setMessage(location.state.message);

//       setTimeout(() => {
//         setMessage(null);
//       }, 2000);

//       // clear state so it doesn't persist
//       window.history.replaceState({}, document.title);
//     }
//   }, [location.state]);

//     const refreshProjects = async () => {
//         const data = await getProjects(page, search);
//         setProjects(data.results);
//         setTotalPages(Math.ceil(data.count / 5));
//     };


//     const handleDelete = async (id: number) => {
//     await API.delete(`/projects/${id}/`);

//     refreshProjects();

//     setMessage("Project deleted successfully"); 

//     setTimeout(() => {
//       setMessage(null); 
//     }, 2000);
//   };

//   return (
//     <Box sx={{ p: 4 }}>

//     <Box sx={{ mt:2, textAlign: "center" }}>
//       <PageHeader title="Project Management Tool" />
//     </Box>

//     <TextField
//         label="Search Projects"
//         value={search}
//         onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1); // reset page on search
//         }}
//         sx={{ mb: 2, width: "1225px" }}
//     />

//       {message && (
//         <Box
//           sx={{
//             mb: 2,
//             p: 2,
//             bgcolor: "#e8f5e9",
//             color: "#2e7d32",
//             borderRadius: 1,
//           }}
//         >
//           {message}
//         </Box>
//       )}

      
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 3,
//         }}
//       >
//         <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//           My Projects
//         </Typography>

//         <Button
//           variant="contained"
//           color="success"
//           onClick={() => navigate("/create-project")}
//         >
//           Create Project
//         </Button>
//       </Box>

      
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//         {projects.map((p: any) => (
//           <Card key={p.id} sx={{ cursor: "pointer" }}>
//             <CardContent
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
              
//               <Box onClick={() => navigate(`/projects/${p.id}`)}>
//                 <Typography variant="h6">
//                   {p.title}
//                 </Typography>

//                 <Typography variant="body2">
//                   {p.description}
//                 </Typography>

//                 <Typography variant="caption">
//                   {p.status}
//                 </Typography>
//               </Box>

              
//               <Box sx={{ display: "flex", gap: 1 }}>
//                 <Button
//                   size="small"
//                   onClick={() =>
//                     navigate(`/projects/edit/${p.id}`)
//                   }
//                 >
//                   Edit
//                 </Button>

//                 <Button
//                   size="small"
//                   color="error"
//                   onClick={() => handleDelete(p.id)}
//                 >
//                   Delete
//                 </Button>
//               </Box>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>

//       <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
//         <Button
//             disabled={page === 1}
//             onClick={() => setPage((prev) => prev - 1)}
//         >
//             Prev
//         </Button>

//         <Typography>
//             Page {page} of {totalPages}
//         </Typography>

//         <Button
//             disabled={page === totalPages}
//             onClick={() => setPage((prev) => prev + 1)}
//         >
//             Next
//         </Button>
//       </Box>

//     </Box>
//   );
// };

// export default Dashboard;



import { useEffect, useState } from "react";
import { getProjects } from "../api/projects";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";
import PageHeader from "../components/PageHeader";

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Container,
  Chip,
} from "@mui/material";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProjects(page, search);
      setProjects(data.results);
      setTotalPages(Math.ceil(data.count / 5));
    };

    fetchData();
  }, [page, search]);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);

      setTimeout(() => {
        setMessage(null);
      }, 2000);

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const refreshProjects = async () => {
    const data = await getProjects(page, search);
    setProjects(data.results);
    setTotalPages(Math.ceil(data.count / 5));
  };

  const handleDelete = async (id: number) => {
    await API.delete(`/projects/${id}/`);

    refreshProjects();
    setMessage("Project deleted successfully");

    setTimeout(() => setMessage(null), 2000);
  };

  return (
    <Box sx={{ background: "#f6f8fa", minHeight: "100vh", py: 3 }}>
      <Container maxWidth="md">
        <PageHeader title="Projects Dashboard" />

        {/* Search + Create */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <TextField
            label="Search projects"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            size="small"
            sx={{ flex: 1 }}
          />

          <Button
            variant="contained"
            onClick={() => navigate("/create-project")}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 1,
            }}
          >
            Create Project
          </Button>
        </Box>

        {/* Message */}
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

        {/* Project List */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {projects.map((p: any) => (
            <Card
              key={p.id}
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
                {/* Left content */}
                <Box
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/projects/${p.id}`)}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {p.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {p.description}
                  </Typography>

                  <Chip
                    label={p.status}
                    size="small"
                    sx={{ mt: 1 }}
                    color={
                      p.status === "completed"
                        ? "success"
                        : p.status === "active"
                        ? "info"
                        : "default"
                    }
                  />
                </Box>

                {/* Actions */}
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    size="small"
                    onClick={() => navigate(`/projects/edit/${p.id}`)}
                    sx={{ textTransform: "none" }}
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(p.id)}
                    sx={{ textTransform: "none" }}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mt: 4,
          }}
        >
          <Button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </Button>

          <Typography variant="body2">
            Page {page} of {totalPages}
          </Typography>

          <Button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;