import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Bejelentkezes() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = () => {
    console.log(email);
    if (!email) {
      toast.error("Az email cím megadása kötelező!");
      return;
    }
    if (!name) {
      toast.error("A név megadása kötelező!");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Hibás formátumú email cím");
      return;
    }
    fetch("https://localhost:44344/api/Szemelyek", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Nev: name,
        Email: email,
      }),
    }).then((response) => {
      if (!response.ok) {
        if (response.status == 409) {
          toast.error("Már jelentkeztél előadásokra.");
        }
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({ name: name, email: email })
        );
        navigate("/fooldal");
      }
    });

    // Navigate to Fooldal if email is valid
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
