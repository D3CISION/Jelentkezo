import React, { useState, useEffect, useMemo, useCallback } from "react";
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

// Simple HTML sanitizer to prevent XSS and malformed HTML
const sanitizeHtml = (html) => {
  const div = document.createElement('div');
  div.textContent = html; // Convert HTML to text to escape special characters
  return div.innerHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

function Admin() {
  const [esemenyek, setEsemenyek] = useState([]);
  const [jelentkezesek, setJelentkezesek] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState({});
  const [hoveredRow, setHoveredRow] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

  // Time slots for selection
  const fullTimeSlots = [
    "08:00:00",
    "08:30:00",
    "09:00:00",
    "09:30:00",
    "10:00:00",
    "10:30:00",
    "11:00:00",
    "11:30:00",
  ];

  const hourlyTimeSlots = [
    "08:00:00",
    "09:00:00",
    "10:00:00",
    "11:00:00",
  ];

  // Default time slot
  const DEFAULT_TIME = "08:00:00";

  // Prevent Ctrl + S default behavior
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        console.log('Ctrl + S intercepted, preventing default behavior');
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

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Fetch events and registrations
  useEffect(() => {
    const fetchEsemenyek = async () => {
      try {
        const response = await fetch("https://localhost:44344/api/Esemeny");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched esemenyek:', data); // Log fetched events
        setEsemenyek(data);
      } catch (error) {
        console.error('Error fetching esemenyek:', error);
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
        console.log('Fetched jelentkezesek:', data); // Log fetched registrations
        setJelentkezesek(data);
      } catch (error) {
        console.error('Error fetching jelentkezesek:', error);
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
        console.log('Rooms for time slot initialization:', rooms); // Log rooms
        let updated = false;
        rooms.forEach((room) => {
          if (!newSelectedTimes[room]) {
            newSelectedTimes[room] = DEFAULT_TIME;
            updated = true;
          }
        });
        console.log('Updated selectedTimes:', newSelectedTimes); // Log updated times
        return updated ? newSelectedTimes : prev;
      });
    }
  }, [esemenyek]);

  // Helper function to convert time string (HH:mm:ss) to minutes since midnight
  const timeToMinutes = useCallback((time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }, []);

  // Group events by room and extract unique tema and eloado
  const groupedByRoom = useMemo(() => {
    const result = esemenyek.reduce((acc, event) => {
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
    console.log('Grouped by room:', result); // Log grouped data
    return result;
  }, [esemenyek]);

  // Get registrations for an event
  const getRegistrationsForEvent = useCallback((eventId) => {
    const filtered = jelentkezesek.filter(
      (j) =>
        j &&
        j.EsemenyId === eventId &&
        j.Szemelyek &&
        typeof j.Szemelyek === "object" &&
        j.Szemelyek.Nev &&
        j.Email &&
        j.Id
    );
    console.log(`Registrations for event ${eventId}:`, filtered); // Log registrations per event
    return filtered;
  }, [jelentkezesek]);

  // Filter events by selected time for a specific room
  const getEventsForSelectedTime = useCallback((terem) => {
    const selectedTime = selectedTimes[terem] || DEFAULT_TIME;
    if (!selectedTime) {
      console.log(`No selected time for ${terem}, returning all events`); // Log fallback
      return groupedByRoom[terem]?.events || [];
    }
    const filtered = groupedByRoom[terem].events.filter((event) => {
      const startMinutes = timeToMinutes(event.Kezd);
      const endMinutes = timeToMinutes(event.Veg);
      const selectedMinutes = timeToMinutes(selectedTime);
      return startMinutes <= selectedMinutes && selectedMinutes < endMinutes;
    });
    console.log(`Events for ${terem} at ${selectedTime}:`, filtered); // Log filtered events
    return filtered;
  }, [selectedTimes, groupedByRoom, timeToMinutes]);

  // Memorized room data for rendering
  const roomData = useMemo(() => {
    const data = Object.entries(groupedByRoom).map(([terem, { events, tema, eloado }]) => {
      const registrations = getEventsForSelectedTime(terem)
        .flatMap((event) => getRegistrationsForEvent(event.Id))
        .sort((a, b) => a.Szemelyek.Nev.localeCompare(b.Szemelyek.Nev));
      console.log(`Room data for ${terem}:`, { terem, events, tema, eloado, registrations }); // Log room data
      return { terem, events, tema, eloado, registrations };
    });
    console.log('All room data:', data); // Log all room data
    return data;
  }, [groupedByRoom, getEventsForSelectedTime, getRegistrationsForEvent]);

  // Handle time slot selection for a specific room
  const handleTimeSelect = useCallback((terem, time) => {
    console.log(`Selecting time ${time} for ${terem}`); // Log time selection
    setSelectedTimes((prev) => ({
      ...prev,
      [terem]: time,
    }));
  }, []);

  // Handle mouse events for hover
  const handleMouseEnter = useCallback((rowId) => {
    setHoveredRow((prev) => (prev !== rowId ? rowId : prev));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredRow((prev) => (prev !== null ? null : prev));
  }, []);

  // Handle delete registration
  const handleDelete = useCallback(async (id) => {
    try {
      console.log(`Deleting registration with id ${id}`); // Log delete attempt
      const response = await fetch(`https://localhost:44344/api/Jelentkezesek/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
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
      console.error('Error deleting registration:', error);
      Toastify({
        text: "Hiba a jelentkezés törlésekor!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#d32f2f",
        stopOnFocus: true,
      }).showToast();
    }
  }, []);

  // Handle print for a specific table
  const handlePrint = useCallback((terem) => {
    console.log(`Initiating print for terem: ${terem}`);
    const printArea = document.getElementById(`print-area-${terem}`);
    if (!printArea) {
      console.error(`Print area not found for terem: ${terem}`);
      Toastify({
        text: "Nem található nyomtatási tartalom!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#d32f2f",
        stopOnFocus: true,
      }).showToast();
      return;
    }

    // Get and log content details
    const printContent = printArea.innerHTML;
    console.log(`Print content length for ${terem}: ${printContent.length}`); // Log content size
    console.log(`Print content preview for ${terem}:`, printContent.slice(0, 200)); // Log content preview
    if (printContent.length > 1000000) {
      console.error('Print content too large');
      Toastify({
        text: "A nyomtatási tartalom túl nagy!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#d32f2f",
        stopOnFocus: true,
      }).showToast();
      return;
    }

    try {
      console.log(`Opening print window for ${terem}`);
      const printWindow = window.open('about:blank', '_blank');
      if (!printWindow) {
        console.error('Failed to open print window');
        Toastify({
          text: "Nem sikerült megnyitni a nyomtatási ablakot!",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#d32f2f",
          stopOnFocus: true,
        }).showToast();
        return;
      }

      console.log(`Writing content to print window for ${terem}`);
      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="hu">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nyomtatás - ${sanitizeHtml(terem)}</title>
            <style>
              @media print {
                body {
                  font-family: Helvetica, Arial, sans-serif;
                  margin: 0;
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
          </head>
          <body>
            <div id="print-section">${printContent}</div>
            <script>
              console.log('Print window loaded for ${terem}');
              try {
                console.log('Focusing print window');
                window.focus();
                console.log('Triggering print dialog');
                window.print();
                console.log('Scheduling window close in 1000ms');
                setTimeout(() => {
                  try {
                    console.log('Closing print window');
                    window.close();
                  } catch (e) {
                    console.error('Error closing print window:', e);
                  }
                }, 1000);
              } catch (e) {
                console.error('Error in print window:', e);
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
      console.log(`Print window content written and closed for ${terem}`);
    } catch (error) {
      console.error(`Error during print operation for ${terem}:`, error);
      Toastify({
        text: "Hiba történt a nyomtatás során!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#d32f2f",
        stopOnFocus: true,
      }).showToast();
    }
  }, []);

  return (
    adminLoggedIn && (

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
          {roomData.length > 0 ? (
            roomData.map(({ terem, events, tema, eloado, registrations }) => {
              // Select time slots based on whether it's the 40-minute show
              const currentTimeSlots = tema === "Horgolj velem!" ? hourlyTimeSlots : fullTimeSlots;

              return (
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
                    {currentTimeSlots.map((time) => (
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
                      Terem: {sanitizeHtml(terem)} (Téma: {sanitizeHtml(tema)}, Előadó: {sanitizeHtml(eloado)})
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
                        {registrations.length > 0 ? (
                          registrations.map((j, index) => {
                            return (
                              <TableRow key={`${j.Id}-${index}`}>
                                <TableCell>{sanitizeHtml(j.Szemelyek.Nev || "")}</TableCell>
                                <TableCell>{sanitizeHtml(j.Email || "")}</TableCell>
                                <TableCell />
                              </TableRow>
                            );
                          })
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
                          <TableCell sx={{}} className="delete-column" />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {registrations.length > 0 ? (
                          registrations.map((j, index) => (
                            <TableRow
                              key={j.Id}
                              onMouseEnter={() => handleMouseEnter(`${j.Id}`)}
                              onMouseLeave={handleMouseLeave}
                              sx={{
                                backgroundColor: hoveredRow === `${j.Id}` ? '#f5f5f5' : 'inherit',
                                '&:hover': { backgroundColor: '#f5f5f5' },
                              }}
                            >
                              <TableCell sx={{ fontSize: isMobile ? "0.6rem" : "0attitudesize(0.2rem", padding: '8px' }}>
                                {j.Szemelyek.Nev || ""}
                              </TableCell>
                              <TableCell sx={{ fontSize: isMobile ? "0.6rem" : "0.8rem", padding: '8px' }}>
                                {j.Email || ""}
                              </TableCell>
                              <TableCell sx={{ fontSize: isMobile ? "0.6rem" : "0.8rem", padding: '8px' }}>
                                {/* Empty Aláírás column */}
                              </TableCell>
                              <TableCell
                                sx={{
                                  width: 40,
                                  textAlign: 'right',
                                  padding: '8px',
                                  verticalAlign: 'middle',
                                  lineHeight: 'normal',
                                }}
                                className="delete-column"
                              >
                                {hoveredRow === `${j.Id}` && (
                                  <IconButton
                                    size="small"
                                    onClick={() => handleDelete(j.Id)}
                                    sx={{ color: "#d32f2f", padding: 0 }}
                                  >
                                    <CloseIcon fontSize="small" />
                                  </IconButton>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} sx={{ fontSize: isMobile ? "0.6rem" : "0.8rem", textAlign: 'center', padding: '8px' }}>
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
              );
            })
          ) : (
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Nincs adat a jelentkezéshez.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  ) 
  );
}

export default Admin;