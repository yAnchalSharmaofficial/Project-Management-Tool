import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";



import {Container, TextField, Button, Typography, Box, Paper} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("LOGIN DATA:", { email, password });

    try {
      const data = await loginUser({ email, password });

      
      const token = data.access || data.token;

      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    
     <Container maxWidth="sm">
     <Box sx={{ mt: 6, textAlign: "center" }}>
      <PageHeader title="Project Management Tool" />
    </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper sx={{ p: 4, width: "100%" }} elevation={3}>
          
          <Typography
            variant="h5"
            sx={{ mb: 3, fontWeight: "bold" }}
          >
            Login
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="success"
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </form>

          <Typography
            variant="body2"
            sx={{ mt: 2, cursor: "pointer", color: "primary.main" }}
            onClick={() => navigate("/register")}
          >
            Create account
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;