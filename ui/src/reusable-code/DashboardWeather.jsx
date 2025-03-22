import React from "react";
import { AppBar, Toolbar, Typography, Grid, Card, CardContent, Container, Box } from "@mui/material";
import Forecast from "./FiveDayForecast";

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={2}>
          {/* Left: Garden Containers (2 rows, 3 columns) */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              {[...Array(6)].map((_, index) => (
                <Grid item xs={4} key={index}>
                  <Card sx={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CardContent>
                      <Typography variant="body1">Garden {index + 1}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right Side */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              {/* 5-Day Weather Forecast */}
              <Grid item xs={12}>
                <Card sx={{ minHeight: 250, height: "auto" }}>
                  <CardContent>
                    {/* props forecast below */}
                    <Forecast />
                  </CardContent>
                </Card>
              </Grid>

              {/* Nurseries in Your Area */}
              <Grid item xs={12}>
                <Card sx={{ height: 200 }}>
                  <CardContent>
                    <Typography variant="h6">Nurseries in Your Area</Typography>
                    {/* Nursery details go here */}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ textAlign: "center", padding: 2, backgroundColor: "#f5f5f5" }}>
        <Typography variant="body2">&copy; 2025 Garden Dashboard</Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;