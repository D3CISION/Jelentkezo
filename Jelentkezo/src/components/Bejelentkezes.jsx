import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function Bejelentkezes() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = () => {
    if (!email) {
      Toastify({
        text: "Az email cím megadása kötelező!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#f44336", // Red for error
        stopOnFocus: true,
      }).showToast();
      return;
    }
    if (!name) {
      Toastify({
        text: "A név megadása kötelező!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#f44336", // Red for error
        stopOnFocus: true,
      }).showToast();
      return;
    }
    if (!emailRegex.test(email)) {
      Toastify({
        text: "Nem megfelelő formátumú email cím!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#f44336", // Red for error
        stopOnFocus: true,
      }).showToast();
      return;
    }

    // Navigate to Fooldal if email is valid
    navigate("/fooldal");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: (theme) =>
            theme.palette.background.default || "#fff",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 4,
            color: (theme) => theme.palette.text.primary || "#000",
          }}
        >
          Bejelentkezés
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: 400,
          }}
        >
          <TextField
            id="name"
            label="Név"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
            onClick={handleSubmit}
          >
            Belépés
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Bejelentkezes;
