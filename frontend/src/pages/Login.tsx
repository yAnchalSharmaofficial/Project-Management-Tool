import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await loginUser({ email, password });

      const accessToken = data.access || data.token;
      const refreshToken = data.refresh;

      localStorage.setItem("token", accessToken);
      if (refreshToken) {
        localStorage.setItem("refresh", refreshToken);
      }

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
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
          
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, mb: 0.5, textAlign: "center" }}
          >
            Welcome back
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3, textAlign: "center" }}
          >
            Login to continue
          </Typography>

          
          <form onSubmit={handleLogin}>
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
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              textAlign: "center",
              cursor: "pointer",
              color: "primary.main",
            }}
            onClick={() => navigate("/register")}
          >
            Create an account
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;