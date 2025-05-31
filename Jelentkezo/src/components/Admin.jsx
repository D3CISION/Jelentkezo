import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function Admin() {
  const [esemenyek, setEsemenyek] = useState([]);
  const [jelentkezesek, setJelentkezesek] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState({});
  const [hoveredRow, setHoveredRow] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Time slots for selection (every 30 minutes from 8:00 to 11:30)
  const timeSlots = [
    "08:00:00",
    "08:30:00",
    "09:00:00",
    "09:30:00",
    "10:00:00",
    "10:30:00",
    "11:00:00",
    "11:30:00",
  ];

  // Default time slot
  const DEFAULT_TIME = "08:00:00";

  // Fetch events and registrations
  useEffect(() => {
    const fetchEsemenyek = async () => {
      try {
        const response = await fetch("https://localhost:44344/api/Esemeny");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEsemenyek(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        Toastify({
          text: "Hiba az események betöltésekor!",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#d32f2f",
          stopOnFocus: true,
        }).showToast();
      }
    };

    const fetchJelentkezesek = async () => {
      try {
        const response = await fetch("https://localhost:44344/api/Jelentkezesek");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched registrations:", data);
        setJelentkezesek(data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
        Toastify({
          text: "Hiba a jelentkezések betöltésekor!",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#d32f2f",
          stopOnFocus: true,
        }).showToast();
      }
    };

    fetchEsemenyek();
    fetchJelentkezesek();
  }, []);

  // Set default time slot for each room when esemenyek changes
  useEffect(() => {
    if (esemenyek.length > 0) {
      setSelectedTimes((prev) => {
        const newSelectedTimes = { ...prev };
        const rooms = [...new Set(esemenyek.map((event) => event.Terem))];
        rooms.forEach((terem) => {
          if (!newSelectedTimes[terem]) {
            newSelectedTimes[terem] = DEFAULT_TIME;
          }
        });
        return newSelectedTimes;
      });
    }
  }, [esemenyek]);

  // Helper function to convert time string (HH:mm:ss) to minutes since midnight
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Group events by room and extract unique tema and eloado
  const groupedByRoom = esemenyek.reduce((acc, event) => {
    if (!acc[event.Terem]) {
      acc[event.Terem] = {
        events: [],
        tema: event.Tema,
        eloado: event.Eloado,
      };
    }
    acc[event.Terem].events.push(event);
    return acc;
  }, {});

  // Get registrations for an event
  const getRegistrationsForEvent = (eventId) => {
    return jelentkezesek.filter(
      (j) =>
        j &&
        j.EsemenyId === eventId &&
        j.Szemelyek &&
        typeof j.Szemelyek === "object" &&
        j.Szemelyek.Nev
    );
  };

  // Filter events by selected time for a specific room
  const getEventsForSelectedTime = (terem) => {
    const selectedTime = selectedTimes[terem] || DEFAULT_TIME;
    if (!selectedTime) return groupedByRoom[terem]?.events || [];
    return groupedByRoom[terem].events.filter((event) => {
      const startMinutes = timeToMinutes(event.Kezd);
      const endMinutes = timeToMinutes(event.Veg);
      const selectedMinutes = timeToMinutes(selectedTime);
      return startMinutes <= selectedMinutes && selectedMinutes < endMinutes;
    });
  };

  // Handle time slot selection for a specific room
  const handleTimeSelect = (terem, time) => {
    setSelectedTimes((prev) => ({
      ...prev,
      [terem]: time,
    }));
  };

  // Handle delete registration
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://localhost:44344/api/Jelentkezesek/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Update state to remove deleted registration
      setJelentkezesek((prev) => prev.filter((j) => j.Id !== id));
      Toastify({
        text: "Jelentkezés sikeresen törölve!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#4caf50",
        stopOnFocus: true,
      }).showToast();
    } catch (error) {
      console.error("Error deleting registration:", error);
      Toastify({
        text: "Hiba a jelentkezés törlésekor!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#d32f2f",
        stopOnFocus: true,
      }).showToast();
    }
  };

  // Handle print for a specific table
  const handlePrint = (terem) => {
    const printContent = document.getElementById(`print-area-${terem}`).innerHTML;
    const originalContent = document.body.innerHTML;

    // Create a temporary container for print content
    const printContainer = document.createElement("div");
    printContainer.innerHTML = `
      <style>
        @media print {
          body * {
            visibility: hidden;
          }
          #print-section, #print-section * {
            visibility: visible;
          }
          #print-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            font-family: Helvetica, Arial, sans-serif;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12pt;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          th {
            font-weight: bold;
            background-color: #f0f0f0;
          }
          .delete-column {
            display: none;
          }
          .print-header {
            margin-bottom: 16px;
            font-size: 14pt;
          }
          .print-time {
            margin-bottom: 8px;
            font-size: 12pt;
          }
        }
      </style>
      <div id="print-section">
        ${printContent}
      </div>
    `;

    document.body.appendChild(printContainer);
    window.print();
    document.body.removeChild(printContainer);
    document.body.innerHTML = originalContent;
  };

  return (
    <Container maxWidth="lg">
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
          component="h2"
          sx={{
            mb: 4,
            color: "#000",
            textAlign: "center",
          }}
        >
          Adminisztrátori rend - Jelentkezések
        </Typography>

        <Box sx={{ width: "100%", overflowX: "auto" }}>
          {Object.keys(groupedByRoom).length > 0 ? (
            Object.entries(groupedByRoom).map(([terem, { events, tema, eloado }]) => (
              <Box key={terem} sx={{ mb: 6, width: "100%" }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: "bold", color: "#000" }}
                >
                  Terem: {terem} (Téma: {tema}, Előadó: {eloado})
                </Typography>
                {/* Time Slot Selector and Print Button */}
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTimes[terem] === time ? "contained" : "outlined"}
                      color="primary"
                      size="small"
                      onClick={() => handleTimeSelect(terem, time)}
                      sx={{
                        fontSize: isMobile ? "0.7rem" : "0.8rem",
                        minWidth: 100,
                        textTransform: "none",
                      }}
                    >
                      {time.slice(0, 5)}
                    </Button>
                  ))}
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<PrintIcon />}
                    onClick={() => handlePrint(terem)}
                    sx={{
                      fontSize: isMobile ? "0.7rem" : "0.8rem",
                      textTransform: "none",
                      ml: 2,
                    }}
                  >
                    Nyomtatás
                  </Button>
                </Box>
                {/* Hidden Print Area */}
                <Box id={`print-area-${terem}`} sx={{ display: "none" }}>
                  <Typography variant="h6" className="print-header">
                    Terem: {terem} (Téma: {tema}, Előadó: {eloado})
                  </Typography>
                  <Typography variant="body1" className="print-time">
                    Időpont: {selectedTimes[terem]?.slice(0, 5) || DEFAULT_TIME.slice(0, 5)}
                  </Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Név</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Aláírás</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getEventsForSelectedTime(terem).length > 0 &&
                      getEventsForSelectedTime(terem)
                        .flatMap((event) => getRegistrationsForEvent(event.Id))
                        .length > 0 ? (
                        getEventsForSelectedTime(terem)
                          .sort((a, b) => a.Kezd.localeCompare(b.Kezd))
                          .flatMap((event) =>
                            getRegistrationsForEvent(event.Id).map((j, index) => (
                              <TableRow key={`${event.Id}-${index}`}>
                                <TableCell>{j.Szemelyek.Nev || ""}</TableCell>
                                <TableCell>{j.Email || ""}</TableCell>
                                <TableCell />
                              </TableRow>
                            ))
                          )
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} sx={{ textAlign: "center" }}>
                            Nincs ebben az időpontban jelentkező
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Box>
                {/* Visible Table */}
                <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                  <Table size={isMobile ? "small" : "medium"}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", fontSize: isMobile ? "0.7rem" : "0.9rem" }}>
                          Név
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", fontSize: isMobile ? "0.7rem" : "0.9rem" }}>
                          Email
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", fontSize: isMobile ? "0.7rem" : "0.9rem" }}>
                          Aláírás
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", fontSize: isMobile ? "0.7rem" : "0.9rem" }} className="delete-column" />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getEventsForSelectedTime(terem).length > 0 &&
                      getEventsForSelectedTime(terem)
                        .flatMap((event) => getRegistrationsForEvent(event.Id))
                        .length > 0 ? (
                        getEventsForSelectedTime(terem)
                          .sort((a, b) => a.Kezd.localeCompare(b.Kezd))
                          .flatMap((event) =>
                            getRegistrationsForEvent(event.Id).map((j, index) => (
                              <TableRow
                                key={`${event.Id}-${index}`}
                                onMouseEnter={() => setHoveredRow(`${event.Id}-${index}`)}
                                onMouseLeave={() => setHoveredRow(null)}
                              >
                                <TableCell sx={{ fontSize: isMobile ? "0.6rem" : "0.8rem" }}>
                                  {j.Szemelyek.Nev || ""}
                                </TableCell>
                                <TableCell sx={{ fontSize: isMobile ? "0.6rem" : "0.8rem" }}>
                                  {j.Email || ""}
                                </TableCell>
                                <TableCell sx={{ fontSize: isMobile ? "0.6rem" : "0.8rem" }}>
                                  {/* Empty Aláírás column */}
                                </TableCell>
                                <TableCell sx={{ width: 40, textAlign: "right" }} className="delete-column">
                                  {hoveredRow === `${event.Id}-${index}` && (
                                    <IconButton
                                      size="small"
                                      onClick={() => handleDelete(j.Id)}
                                      sx={{ color: "#d32f2f" }}
                                    >
                                      <CloseIcon fontSize="small" />
                                    </IconButton>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))
                          )
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} sx={{ fontSize: isMobile ? "0.6rem" : "0.8rem", textAlign: "center" }}>
                            {selectedTimes[terem]
                              ? "Nincs ebben az időpontban jelentkező"
                              : "Válassz időpontot a jelentkezések megtekintéséhez"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ))
          ) : (
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Nincs adat a jelentkezéshez.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Admin;