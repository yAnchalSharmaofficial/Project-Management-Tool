import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import {Container, TextField, Button, Typography, Box, Paper} from "@mui/material";
import PageHeader from "../components/PageHeader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerUser({ email, password });

      alert("Registered successfully");

      navigate("/login");
    } catch (err) {
      alert("Registration failed");
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
            Register
          </Typography>

          <form onSubmit={handleRegister}>
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
              color="success"
              fullWidth
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          </form>

          <Typography
            variant="body2"
            sx={{ mt: 2, cursor: "pointer", color: "primary.main" }}
            onClick={() => navigate("/login")}
          >
            Already have an account?
          </Typography>

        </Paper>
      </Box>
    </Container>
  );
};

export default Register;