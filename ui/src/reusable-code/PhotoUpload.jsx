import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../custom-css/Dashboard.css"; // add this if your styles are in a separate CSS file

const PhotoUpload = () => {
  const [file, setFile] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [gardenId, setGardenId] = useState("");
  const [gardens, setGardens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("JWT_TOKEN");
    const csrfToken = localStorage.getItem("CSRF_TOKEN");

    fetch("http://localhost:8080/api/photo/gardens-without-photo/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-XSRF-TOKEN": csrfToken,
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setGardens(data))
      .catch((err) => console.error("Failed to fetch gardens", err));
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !photoName || !gardenId) {
      alert("All fields are required!");
      return false;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("photoName", photoName);
    formData.append("gardenId", gardenId);

    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const csrfToken = localStorage.getItem("CSRF_TOKEN");
      const response = await fetch("http://localhost:8080/api/photo/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-XSRF-TOKEN": csrfToken,
          Accept: "application/json",
        },
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        setFile(null);
        setPhotoName("");
        setGardenId("");
        navigate("/dashboard");
        return true;
      } else {
        alert("Failed to upload photo.");
        return false;
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      return false;
    }
  };

  return (
    <div className="dashboard-wrapper center">
      <div className="card photo-upload-card">
        <div className="card-content">
          <h2 className="personalize-label">Upload a Garden Photo</h2>
          <p style={{ color: "#4F6F52", fontSize: "1rem" }}>
            Add a beautiful moment to your garden 🌿
          </p>

          <form
            className="photo-form"
            onSubmit={async (e) => {
              e.preventDefault();
              const success = await handleUpload();
              if (success) navigate("/dashboard");
            }}
          >
            <label className="form-label">Select Photo:</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="form-input"
            />

            <label className="form-label">Photo Name:</label>
            <input
              type="text"
              value={photoName}
              onChange={(e) => setPhotoName(e.target.value)}
              className="form-input"
              placeholder="e.g., Spring Blooms"
            />

            <label className="form-label">Select Garden:</label>
            <select
              value={gardenId}
              onChange={(e) => setGardenId(e.target.value)}
              className="form-input"
            >
              <option value="">-- Select Your Garden --</option>
              {gardens.map((garden) => (
                <option key={garden.id} value={garden.id}>
                  {garden.gardenName}
                </option>
              ))}
            </select>

            <div className="button-group">
              <button type="submit" className="dashboard-button">
                Upload
              </button>
              <button
                type="button"
                className="dashboard-button"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Button,
//   Container,
//   Card,
//   CardContent,
//   Typography,
//   Input,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";

// const PhotoUpload = ({ userId: defaultUserId, gardenId: defaultGardenId }) => {
//   const [file, setFile] = useState(null);
//   const [photoName, setPhotoName] = useState("");
//   const [gardenId, setGardenId] = useState("");
//   const [gardens, setGardens] = useState([]);

//   const navigate = useNavigate();
//   const handleNavigateToDashboard = () => {
//     navigate("/dashboard");
//   };

//   // ***** FETCHING GARDENS PER USERID *****
//   useEffect(() => {
//     const token = localStorage.getItem("JWT_TOKEN");
//     const csrfToken = localStorage.getItem("CSRF_TOKEN");

//     fetch("http://localhost:8080/api/photo/gardens-without-photo/user", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "X-XSRF-TOKEN": csrfToken,
//         Accept: "application/json",
//       },
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched gardens:", data);
//         setGardens(data);
//       })
//       .catch((err) => console.error("Failed to fetch gardens", err));
//   }, []);
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file || !photoName || !gardenId) {
//       alert("All fields are required!");
//       return false;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("photoName", photoName);
//     formData.append("gardenId", gardenId);

//     try {
//       const token = localStorage.getItem("JWT_TOKEN");
//       const csrfToken = localStorage.getItem("CSRF_TOKEN");
//       const response = await fetch("http://localhost:8080/api/photo/upload", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "X-XSRF-TOKEN": csrfToken,
//           Accept: "application/json",
//         },
//         credentials: "include",
//         body: formData,
//       });

//       if (response.ok) {
//         setFile(null);
//         setPhotoName("");
//         setGardenId("");
//         navigate("/dashboard");
//         return true;
//       } else {
//         alert("Failed to upload photo.");
//         return false;
//       }
//     } catch (error) {
//       console.error("Error uploading photo:", error);
//       return false;
//     }
//   };

//   return (
//     <Box
//       sx={{
//         backgroundColor: "#F3E5F5",
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 2,
//       }}
//     >
//       <Container maxWidth="sm">
//         <Card sx={{ padding: 4, backgroundColor: "#cce3de", borderRadius: 4 }}>
//           <CardContent>
//             <Typography variant="h5" align="center" gutterBottom>
//               Upload a Garden Photo
//             </Typography>
//             <Typography variant="body1" align="center" gutterBottom>
//               Add a photo to your garden.
//             </Typography>

//             <Box
//               sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}
//             >
//               <Input
//                 type="file"
//                 onChange={handleFileChange}
//                 sx={{ backgroundColor: "white", padding: 1 }}
//               />
//               <Input
//                 placeholder="Photo Name"
//                 value={photoName}
//                 onChange={(e) => setPhotoName(e.target.value)}
//                 sx={{ backgroundColor: "white", padding: 1 }}
//               />
//               <FormControl fullWidth>
//                 <InputLabel id="garden-select-label">
//                   Select Your Garden
//                 </InputLabel>
//                 <Select
//                   labelId="garden-select-label"
//                   value={gardenId}
//                   onChange={(e) => setGardenId(e.target.value)}
//                   sx={{ backgroundColor: "white" }}
//                 >
//                   <MenuItem value="">-- Select --</MenuItem>
//                   {gardens.map((garden) => (
//                     <MenuItem key={garden.id} value={garden.id}>
//                       {garden.gardenName}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <Button
//                 onClick={async () => {
//                   const success = await handleUpload();
//                   if (success) {
//                     navigate("/dashboard"); // ✅ only navigate if upload succeeded
//                   }
//                 }}
//               >
//                 Upload
//               </Button>
//               <Button
//                 variant="outlined"
//                 sx={{ mt: 1 }}
//                 onClick={() => navigate("/dashboard")}
//               >
//                 Cancel
//               </Button>
//             </Box>
//           </CardContent>
//         </Card>
//       </Container>
//     </Box>
//   );
// };

// export default PhotoUpload;
