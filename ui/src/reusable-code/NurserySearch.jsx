import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useMyContext } from "../store/ContextApi";
import api from "../services/api";

function NurserySearch() {
  // const [zipCode, setZipCode] = useState('');
  const [nurseries, setNurseries] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { zipCode } = useMyContext();

  const handleSearch = async () => {
    setError("");
    setLoading(true);
    setNurseries([]);

    if (!zipCode) {
      setError("Please enter a zip code.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(
        `http://localhost:8080/api/nurseries/local?query=nurseries+${zipCode}&radius=8046.72`
      );
      setNurseries(response.data.results || []);
    } catch (err) {
      console.error("Error fetching nurseries:", err);
      setError("Failed to fetch nurseries. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  //added by angie for dashboard zip code entering
  //****************** */
  useEffect(() => {
    if (zipCode) {
      handleSearch();
    }
  }, [zipCode]);
  //****************************** */
  return (
    <div>
      {/* ******** angie added zipCode input button at top of dashboard page */}
      {/* <TextField
        label="Enter Zip Code"
        variant="outlined"
        size="small"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        sx={{ marginRight: 1 }}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{ backgroundColor: '#cce3de', color: 'black', '&:hover': { backgroundColor: '#b0d4c2' } }}
      >
        Search
      </Button> */}

      {error && (
        <Typography color="error" mt={1}>
          {error}
        </Typography>
      )}
      {loading && <Typography mt={1}>Loading nurseries...</Typography>}

      {!loading && nurseries.length > 0 && (
        <List sx={{ mt: 2 }}>
          {nurseries.map((nursery) => (
            <ListItem
              key={nursery.place_id}
              sx={{ borderBottom: "1px solid #ddd" }}
            >
              <ListItemText
                primary={nursery.name}
                secondary={
                  <>
                    {nursery.formatted_address}
                    <br />
                    <a
                      href={`https://www.google.com/maps/place/?q=place_id:${nursery.place_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Google Maps
                    </a>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}

      {!loading && nurseries.length === 0 && zipCode && !error && (
        <Typography mt={1}>No nurseries found for this zip code.</Typography>
      )}
    </div>
  );
}

export default NurserySearch;
