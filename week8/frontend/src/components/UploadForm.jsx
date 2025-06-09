import React, { useState } from "react";
import axios from "axios";
const UploadForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      setError("Please select an image first.");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedImage);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Uploaded Image Response:", response.data);
    } catch (err) {
      console.error("Image upload failed:", err);
      setError("Image upload failed. Please try again.");
    }
  };
  return (
    <div className="upload-form">
      <h2>Upload & Analyze</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Upload & Analyze</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};
export default UploadForm;
