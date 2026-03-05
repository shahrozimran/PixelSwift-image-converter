import axios from "axios";

// Using the direct IP address to ensure reliable connection on Windows
const API_BASE_URL = "http://127.0.0.1:5000"; 

export const convertImage = async (
  file: File,
  format: string,
  quality: number
) => {
  const formData = new FormData();
  
  // These keys MUST match the backend's multer 'image' and req.body fields
  formData.append("image", file);
  formData.append("format", format);
  formData.append("quality", quality.toString());

  try {
    const response = await axios.post(
      `${API_BASE_URL}/convert`,
      formData,
      { 
        responseType: "blob", // Crucial for receiving binary image data
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Server Error Status:", error.response.status);
    } else if (error.request) {
      console.error("No response received. Ensure the backend is running in a separate terminal on port 5000.");
    } else {
      console.error("Axios Request Error:", error.message);
    }
    throw error;
  }
};