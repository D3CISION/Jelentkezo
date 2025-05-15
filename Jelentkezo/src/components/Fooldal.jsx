import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material";

function Fooldal() {
  // Generate time slots from 8:00 to 11:30 (20-min lectures + 10-min breaks)
  const timeSlots = [];
  let startTime = 8 * 60; // 8:00 in minutes
  while (startTime <= 11.5 * 60) {
    // Up to 11:30
    const startHours = Math.floor(startTime / 60);
    const startMinutes = startTime % 60;
    const endTime = startTime + 20; // 20-minute lecture
    const endHours = Math.floor(endTime / 60);
    const endMinutes = endTime % 60;
    timeSlots.push(
      `${startHours}:${startMinutes.toString().padStart(2, "0")}-` +
        `${endHours}:${endMinutes.toString().padStart(2, "0")}`
    );
    startTime += 30; // 20-min lecture + 10-min break
  }

  // Generate room headers (9A to 12E)
  const rooms = [];
  for (let num = 9; num <= 12; num++) {
    for (let letter of ["A", "B", "C", "D", "E"]) {
      rooms.push(`${num}${letter}`);
    }
  }

  // State to track bookings (time slot -> room with "X")
  const [bookings, setBookings] = useState({}); // e.g., { "8:00-8:20": "9A", "8:30-8:50": "10A" }

  // Check if a room is already booked in any time slot
  const isRoomBooked = (room) => {
    return Object.values(bookings).includes(room);
  };

  // Handle cell click to place, move, or remove "X"
  const handleCellClick = (time, room) => {
    // If clicking the same cell, remove the booking
    if (bookings[time] === room) {
      setBookings((prev) => {
        const newBookings = { ...prev };
        delete newBookings[time];
        return newBookings;
      });
      return;
    }

    // Check if the room is already booked in another time slot
    if (isRoomBooked(room)) {
      // Move the "X" to the new time slot
      setBookings((prev) => {
        const newBookings = { ...prev };
        // Find and remove the existing booking for this room
        const existingTime = Object.keys(prev).find(
          (key) => prev[key] === room
        );
        if (existingTime) {
          delete newBookings[existingTime];
        }
        // Place new booking
        newBookings[time] = room;
        return newBookings;
      });
      return;
    }

    // Check if the time slot is already booked in another room
    if (bookings[time]) {
      // Move the "X" to the new room
      setBookings((prev) => {
        return { ...prev, [time]: room };
      });
      return;
    }

    // Place new booking
    setBookings((prev) => {
      return { ...prev, [time]: room };
    });
  };

  // Generate rows for each room
  const rows = rooms.map((room, index) => {
    const row = { id: index + 1, room };
    timeSlots.forEach((time) => {
      row[time] = bookings[time] === room ? "X" : "Üres";
    });
    return row;
  });

  return (
    <Container maxWidth="lg">
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
          Előadások Ütemterve
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: "90vw", maxHeight: "70vh", overflowY: "auto" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ minWidth: 30 }}>
                  <strong>Terem</strong>
                </TableCell>
                {timeSlots.map((time) => (
                  <TableCell key={time} align="center" sx={{ minWidth: 50 }}>
                    <strong>{time}</strong>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:not(:last-child)": {
                      borderBottom: "2px solid #e0e0e0", // Divider between rows
                    },
                  }}
                >
                  <TableCell align="center">{row.room}</TableCell>
                  {timeSlots.map((time) => (
                    <TableCell
                      key={`${row.id}-${time}`}
                      align="center"
                      onClick={() => handleCellClick(time, row.room)}
                      sx={{
                        cursor: "pointer",
                        bgcolor: row[time] === "X" ? "#e0f7fa" : "inherit",
                        "&:hover": {
                          bgcolor: row[time] === "X" ? "#b2ebf2" : "#f5f5f5",
                        },
                        opacity:
                          (bookings[time] && bookings[time] !== row.room) ||
                          (isRoomBooked(row.room) && row[time] !== "X")
                            ? 0.5
                            : 1,
                      }}
                    >
                      {row[time]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" sx={{ px: 4, py: 1 }}>
            Leadás
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Fooldal;
