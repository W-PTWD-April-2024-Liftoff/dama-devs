import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";

const PhotoFetching = ({ userId }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredPhoto, setFeaturedPhoto] = useState(null);
  const [hoveredPhoto, setHoveredPhoto] = useState(null);
  const navigate = useNavigate();

  const updateFeaturedPhoto = async (photoId) => {
    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const csrfToken = localStorage.getItem("CSRF_TOKEN");

      await fetch(`http://localhost:8080/api/photo/featured/${photoId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-XSRF-TOKEN": csrfToken,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      setFeaturedPhoto(photos.find((p) => p.id === photoId));
    } catch (err) {
      console.error("Failed to update featured photo", err);
    }
  };
  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const csrfToken = localStorage.getItem("CSRF_TOKEN");

      const response = await fetch(`http://localhost:8080/api/photo/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-XSRF-TOKEN": csrfToken,
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setPhotos(data);
        if (data.length > 0) setFeaturedPhoto(data[0]);
      } else {
        setError("Failed to fetch photos.");
      }
    } catch (err) {
      setError("Error fetching photos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPhotos();
    }
  }, [userId]);

  if (loading) return <p>Loading photos...</p>;
  if (error) return <p>{error}</p>;
  if (photos.length === 0) return <p>No photos available.</p>;

  const otherPhotos = photos.filter((photo) => photo.id !== featuredPhoto?.id);

  // *****************  DELETE PHOTO  done in the fetch so you can view the photos you are wanting to edit/delete

  const deletePhoto = async (photoId) => {
    const token = localStorage.getItem("JWT_TOKEN");
    const csrfToken = localStorage.getItem("CSRF_TOKEN");

    try {
      const response = await fetch(
        `http://localhost:8080/api/photo/delete/${photoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        setPhotos((prevPhotos) =>
          prevPhotos.filter((photo) => photo.id !== photoId)
        );
      } else {
        console.error("Failed to delete photo.");
      }
    } catch (err) {
      console.error("Error deleting photo", err);
    }
  };

  //**************** UPDATE PHOTO Will APPLY TO GARDEN DETAILS */
  const updatePhoto = async (photoId, newName) => {
    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const csrfToken = localStorage.getItem("CSRF_TOKEN");

      const response = await fetch(
        `http://localhost:8080/api/photo/${photoId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ photoName: newName }),
        }
      );

      if (response.ok) {
        fetchPhotos(); // refresh photo list
      } else {
        console.error("Failed to update photo");
      }
    } catch (err) {
      console.error("Error updating photo", err);
    }
  };

  return (
    <>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/garden-details/${featuredPhoto.garden.id}`)}
      >
        {/* <h3>{featuredPhoto.photoName}</h3> */}
        <img
          src={`data:image/jpeg;base64,${featuredPhoto.photoImage}`}
          alt={featuredPhoto.photoName}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "8px",
            display: "block",
          }}
        />
        <Typography variant="h6" align="center" sx={{ mt: 1 }}>
          {featuredPhoto.photoName}
        </Typography>
      </div>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {otherPhotos.map((photo) => (
          <Grid item xs={6} sm={3} key={photo.id}>
            <Card
              sx={{
                position: "relative",
                height: 150,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                backgroundColor: "white",
                cursor: "pointer",
                overflow: "hidden",
              }}
              onMouseEnter={() => setHoveredPhoto(photo)}
              onMouseLeave={() => setHoveredPhoto(null)}
            >
              <CardContent
                sx={{
                  textAlign: "center",
                }}
              >
                <img
                  src={`data:image/jpeg;base64,${photo.photoImage}`}
                  alt={photo.photoName}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "80px",
                    borderRadius: "6px",
                  }}
                />
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {photo.photoName}
                </Typography>
              </CardContent>

              {hoveredPhoto?.id === photo.id && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    zIndex: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Change your featured photo to this?
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      updateFeaturedPhoto(photo.id);
                      setHoveredPhoto(null);
                    }}
                  >
                    Yes, Set Photo
                  </Button>
                </Box>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PhotoFetching;
