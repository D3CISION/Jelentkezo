import React from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

function Bejelentkezes() {
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
          <TextField id="name" label="Név" variant="outlined" fullWidth />
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }} fullWidth>
            Belépés
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Bejelentkezes;
