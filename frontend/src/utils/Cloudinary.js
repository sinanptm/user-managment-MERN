import axios from "axios";

export const uploadImageToCloudinary = async (image, setLoading) => {
  const imageData = new FormData();
  imageData.append("file", image);
  imageData.append("upload_preset", "userProfile");

  try {
    setLoading(true);
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dsfmtqw1g/image/upload",
      imageData
    );
    setLoading(false);
    return response.data.secure_url;
  } catch (error) {
    setLoading(false);
    console.error("Cloudinary upload error:", error.response?.data || error.message);
    throw new Error("Image upload failed");
  }
};
