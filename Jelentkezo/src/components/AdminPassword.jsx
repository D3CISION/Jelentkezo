import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  // Prevent Ctrl + S default behavior
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        console.log("Ctrl + S intercepted, preventing default behavior"); // Log Ctrl + S
        Toastify({
          text: "A Ctrl + S letiltva ezen az oldalon.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#1976d2",
          stopOnFocus: true,
        }).showToast();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    console.log("Keydown event listener added"); // Log listener setup

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      console.log("Keydown event listener removed"); // Log listener cleanup
    };
  }, []);

  // Handle password input change
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    console.log("Password input changed, length:", newPassword.length); // Log password change
  };

  // Handle login button click
  const handleLogin = () => {
    
    try {
      const correctPassword = "4Cnj4%XRBe";
      if (password === correctPassword) {
       
        Toastify({
          text: "Sikeres bejelentkezés!",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#4caf50",
          stopOnFocus: true,
        }).showToast();
        localStorage.setItem("adminLoggedIn", "true");
        navigate("/admin");
      } else {
        console.log("Incorrect password entered"); // Log failure
        Toastify({
          text: "Helytelen jelszó!",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#d32f2f",
          stopOnFocus: true,
        }).showToast();
      }
    } catch (error) {
      console.error("Error during login attempt:", error); // Log error
      Toastify({
        text: "Hiba történt a bejelentkezés során!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#d32f2f",
        stopOnFocus: true,
      }).showToast();
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          fontFamily: "Helvetica, Arial, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#fff",
          py: 10,
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h1"
          sx={{
            mb: 4,
            color: "#000",
            textAlign: "center",
          }}
        >
          Adminisztrátori bejelentkezés
        </Typography>

        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Jelszó"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiInputBase-input": {
                fontSize: isMobile ? "0.9rem" : "1rem",
              },
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                console.log("Enter key pressed, triggering login"); // Log Enter key
                handleLogin();
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<LoginIcon />}
            onClick={handleLogin}
            sx={{
              fontSize: isMobile ? "0.9rem" : "1rem",
              textTransform: "none",
              py: 1.5,
            }}
          >
            Belépés
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;