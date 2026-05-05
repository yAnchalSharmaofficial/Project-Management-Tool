// import { useState } from "react";
// import { registerUser } from "../api/auth";
// import { useNavigate } from "react-router-dom";
// import {Container, TextField, Button, Typography, Box, Paper} from "@mui/material";
// import PageHeader from "../components/PageHeader";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       await registerUser({ email, password });

//       alert("Registered successfully");

//       navigate("/login");
//     } catch (err) {
//       alert("Registration failed");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 6, textAlign: "center" }}>
//             <PageHeader title="Project Management Tool" />
//           </Box>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
          
//         }}
//       >
//         <Paper sx={{ p: 4, width: "100%" }} elevation={3}>
          
//           <Typography
//             variant="h5"
//             sx={{ mb: 3, fontWeight: "bold" }}
//           >
//             Register
//           </Typography>

//           <form onSubmit={handleRegister}>
//             <TextField
//               fullWidth
//               label="Email"
//               margin="normal"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <TextField
//               fullWidth
//               label="Password"
//               type="password"
//               margin="normal"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <Button
//               type="submit"
//               variant="contained"
//               color="success"
//               fullWidth
//               sx={{ mt: 2 }}
//             >
//               Register
//             </Button>
//           </form>

//           <Typography
//             variant="body2"
//             sx={{ mt: 2, cursor: "pointer", color: "primary.main" }}
//             onClick={() => navigate("/login")}
//           >
//             Already have an account?
//           </Typography>

//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default Register;


import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser({ email, password });

      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f6f8fa",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            border: "1px solid #e5e7eb",
          }}
        >
          {/* Header */}
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, textAlign: "center", mb: 0.5 }}
          >
            Create account
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", mb: 3 }}
          >
            Start managing your projects
          </Typography>

          {/* Form */}
          <form onSubmit={handleRegister}>
            <TextField
              fullWidth
              label="Email"
              size="small"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              size="small"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mt: 2,
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 1,
              }}
            >
              {loading ? "Creating..." : "Register"}
            </Button>
          </form>

          {/* Footer */}
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              textAlign: "center",
              cursor: "pointer",
              color: "primary.main",
            }}
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;