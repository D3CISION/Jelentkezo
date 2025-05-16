import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function Fooldal() {
  // State for events, lecture types, selected event IDs, user, and submission status
  const [esemenyek, setEsemenyek] = useState([]);
  const [eloadastipusok, setEloadasTipusok] = useState([]);
  const [selectedEventIds, setSelectedEventIds] = useState([]);
  const [user, setUser] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch events and get user from localStorage on component mount
  useEffect(() => {
    const fetchEsemenyek = async () => {
      try {
        const response = await fetch("https://localhost:44344/api/Esemeny");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEsemenyek(data);
        // Ensure each terem appears only once with its tema and eloado
        const seenRooms = new Set();
        const uniqueEloadastipusok = data
          .filter((item) => {
            if (seenRooms.has(item.Terem)) {
              return false;
            }
            seenRooms.add(item.Terem);
            return true;
          })
          .map((item) => ({
            terem: item.Terem,
            tema: item.Tema,
            eloado: item.Eloado,
          }));
        setEloadasTipusok(uniqueEloadastipusok);
        console.log("Fetched events:", data);
        console.log(
          "Unique eloadastipusok (one per room):",
          uniqueEloadastipusok
        );
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("User from localStorage:", parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    } else {
      console.warn("No user found in localStorage");
    }

    fetchEsemenyek();
  }, []); // Empty dependency array to run once on mount

  // Helper function to convert time string (HH:mm:ss) to minutes since 8:00
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return (hours - 8) * 60 + minutes;
  };

  // Check if an event is selectable (no time overlap, one per room, not full)
  const isEventSelectable = (event) => {
    // Check if event is full
    if (event.JelentkezokSzama >= 15) {
      return false;
    }

    const clickedStart = timeToMinutes(event.Kezd);
    const clickedEnd = timeToMinutes(event.Veg);
    const clickedRoom = event.Terem;

    // Check selected events for conflicts
    for (const selectedId of selectedEventIds) {
      const selectedEvent = esemenyek.find((e) => e.Id === selectedId);
      if (!selectedEvent) continue;

      // Check room conflict (one event per room)
      if (selectedEvent.Terem === clickedRoom) {
        return false;
      }

      // Check time overlap
      const selectedStart = timeToMinutes(selectedEvent.Kezd);
      const selectedEnd = timeToMinutes(selectedEvent.Veg);
      if (clickedStart < selectedEnd && selectedStart < clickedEnd) {
        return false;
      }
    }

    return true;
  };

  // Handle box click to toggle selection
  const handleBoxClick = (event) => {
    if (isSubmitted) {
      console.log("Table is frozen, cannot modify selection");
      return;
    }

    const eventId = event.Id;
    if (selectedEventIds.includes(eventId)) {
      // Deselect if already selected
      setSelectedEventIds((prev) => prev.filter((id) => id !== eventId));
      console.log("Deselected event:", {
        id: event.Id,
        terem: event.Terem,
        tema: event.Tema,
        eloado: event.Eloado,
        kezd: event.Kezd,
        veg: event.Veg,
        JelentkezokSzama: event.JelentkezokSzama,
      });
    } else if (event.JelentkezokSzama >= 15) {
      // Show Toastify message if event is full
      Toastify({
        text: `A(z) ${event.Tema} esemény férőhelye már megtelt ebben az időpontban. Kérlek válassz egy másik időpontot!`,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#d32f2f",
        stopOnFocus: true,
      }).showToast();
      console.log("Cannot select event: Full capacity", {
        id: event.Id,
        terem: event.Terem,
        tema: event.Tema,
        eloado: event.Eloado,
        kezd: event.Kezd,
        veg: event.Veg,
        JelentkezokSzama: event.JelentkezokSzama,
      });
    } else if (isEventSelectable(event)) {
      // Select if selectable
      setSelectedEventIds((prev) => [...prev, eventId]);
      console.log("Selected event:", {
        id: event.Id,
        terem: event.Terem,
        tema: event.Tema,
        eloado: event.Eloado,
        kezd: event.Kezd,
        veg: event.Veg,
        JelentkezokSzama: event.JelentkezokSzama,
      });
    } else {
      console.log("Cannot select event due to time overlap or room conflict:", {
        id: event.Id,
        terem: event.Terem,
        tema: event.Tema,
        eloado: event.Eloado,
        kezd: event.Kezd,
        veg: event.Veg,
        JelentkezokSzama: event.JelentkezokSzama,
      });
    }
  };

  // Handle Leadás button submission
  const handleSubmit = async () => {
    // Check for 40-minute events
    const has40MinuteEvent = selectedEventIds.some((id) => {
      const event = esemenyek.find((e) => e.Id === id);
      if (!event) return false;
      const duration = timeToMinutes(event.Veg) - timeToMinutes(event.Kezd);
      return duration === 40;
    });

    // Required number of events
    const requiredCount = has40MinuteEvent ? 7 : 8;

    // Validate selection
    if (selectedEventIds.length === requiredCount) {
      if (!user || !user.email || !user.name) {
        Toastify({
          text: "Felhasználói adatok hiányoznak, leadás nem lehetséges",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#d32f2f",
          stopOnFocus: true,
        }).showToast();
        console.error("Submission failed: User data missing", { user });
        return;
      }

      try {
        const response = await fetch(
          `https://localhost:44344/api/Jelentkezesek?email=${encodeURIComponent(
            user.email
          )}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Nev: user.name,
              EsemenyIdk: selectedEventIds,
            }),
          }
        );

        console.log("Response status:", response.status);
        console.log("Response headers:", [...response.headers]);

        if (!response.ok) {
          const errorBody = await response.text();
          console.log("Error response body:", errorBody);
          throw new Error(
            `HTTP error! status: ${response.status}, body: ${errorBody}`
          );
        }

        // Check if response body is empty
        const contentLength = response.headers.get("content-length");
        let result = {};
        if (contentLength && contentLength !== "0") {
          result = await response.json();
        } else {
          console.log("Response body is empty");
        }

        console.log("Submission successful:", result);
        setIsSubmitted(true); // Freeze table
        Toastify({
          text: "Jelentkezés sikeres",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#388e3c",
          stopOnFocus: true,
        }).showToast();
      } catch (error) {
        console.error("Error submitting selection:", error);
        let toastMessage = "Jelentkezés sikertelen, próbálja újra";
        if (error.message.includes("Duplicate entry")) {
          toastMessage = "Már jelentkeztél ezzel az email címmel";
        }
        Toastify({
          text: toastMessage,
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#d32f2f",
          stopOnFocus: true,
        }).showToast();
      }
    } else {
      Toastify({
        text: "Leadás hibás, nincs kijelölve a maximum lehetséges esemény",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#d32f2f",
        stopOnFocus: true,
      }).showToast();
    }
  };

  // Total timeline duration (8:00 to 12:00 = 240 minutes)
  const totalDuration = 240;

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          fontFamily: "Arial, sans-serif",
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
        <Box
          sx={{
            width: "90vw",
            maxHeight: "70vh",
            overflowY: "auto",
            bgcolor: "#fff",
            boxShadow: 3,
            p: 2,
          }}
        >
          {/* Header Row */}
          <Box
            sx={{
              display: "flex",
              borderBottom: "1px solid #e0e0e0",
              position: "sticky",
              top: 0,
              bgcolor: "#fff",
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                width: 80,
                flexShrink: 0,
                p: 1,
                fontWeight: "bold",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
            >
              Terem
            </Box>
            <Box
              sx={{
                width: 200,
                flexShrink: 0,
                p: 1,
                fontWeight: "bold",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
            >
              Téma
            </Box>
            <Box
              sx={{
                width: 200,
                flexShrink: 0,
                p: 1,
                fontWeight: "bold",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
            >
              Előadó
            </Box>
            <Box sx={{ flexGrow: 1, p: 1, position: "relative" }}>
              {/* Time labels every half-hour, aligned with event starts */}
              {[
                "8:00",
                "8:30",
                "9:00",
                "9:30",
                "10:00",
                "10:30",
                "11:00",
                "11:30",
                "12:00",
              ].map((label, index) => (
                <Typography
                  key={label}
                  sx={{
                    position: "absolute",
                    left: `${((index * 30) / totalDuration) * 100}%`,
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                  }}
                >
                  {label}
                </Typography>
              ))}
            </Box>
          </Box>
          {/* Room Rows */}
          {eloadastipusok.map((room, index) => (
            <Box
              key={room.terem}
              sx={{
                display: "flex",
                borderBottom: "1px solid #e0e0e0",
                "&:last-child": { borderBottom: "none" },
              }}
            >
              <Box
                sx={{
                  width: 80,
                  flexShrink: 0,
                  p: 1,
                  fontSize: "0.8rem",
                  textAlign: "center",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {room.terem}
              </Box>
              <Box
                sx={{
                  width: 200,
                  flexShrink: 0,
                  p: 1,
                  fontSize: "0.8rem",
                  textAlign: "center",
                }}
              >
                {room.tema}
              </Box>
              <Box
                sx={{
                  width: 200,
                  flexShrink: 0,
                  p: 1,
                  fontSize: "0.8rem",
                  textAlign: "center",
                }}
              >
                {room.eloado}
              </Box>
              <Box sx={{ flexGrow: 1, position: "relative", height: 40, p: 1 }}>
                {/* Event Boxes (empty, selectable) */}
                {esemenyek
                  .filter((event) => event.Terem === room.terem)
                  .map((event, eventIndex) => {
                    const startMinutes = timeToMinutes(event.Kezd);
                    const endMinutes = timeToMinutes(event.Veg);
                    const duration = endMinutes - startMinutes;
                    const left = (startMinutes / totalDuration) * 100;
                    const width = (duration / totalDuration) * 100;
                    const isSelected = selectedEventIds.includes(event.Id);
                    const isFull = event.JelentkezokSzama >= 15;

                    return (
                      <Box
                        key={`${room.terem}-${event.Kezd}-${eventIndex}`}
                        {...(!isFull && {
                          onClick: () => handleBoxClick(event),
                        })}
                        sx={{
                          position: "absolute",
                          left: `${left}%`,
                          width: `${width}%`,
                          height: "30px",
                          bgcolor: isFull
                            ? "#b0bec5"
                            : isSelected
                            ? "#4fc3f7"
                            : "#e0f7fa",
                          borderRadius: 1,
                          textAlign: "center",
                          lineHeight: "30px",
                          fontSize: "0.8rem",
                          cursor: isSubmitted || isFull ? "default" : "pointer",
                          "&:hover": {
                            bgcolor:
                              isSubmitted || isFull
                                ? isFull
                                  ? "#b0bec5"
                                  : isSelected
                                  ? "#4fc3f7"
                                  : "#e0f7fa"
                                : isSelected
                                ? "#29b6f6"
                                : "#b2ebf2",
                          },
                          border: isSelected
                            ? "2px solid #0288d1"
                            : "1px solid #b0bec5",
                        }}
                      >
                        {event.JelentkezokSzama + "/15"}
                      </Box>
                    );
                  })}
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ px: 4, py: 1 }}
            onClick={handleSubmit}
            disabled={isSubmitted || !user}
          >
            Leadás
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Fooldal;
