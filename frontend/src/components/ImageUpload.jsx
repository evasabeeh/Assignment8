import { useState } from "react";
import axios from "axios";

const ImageUpload = ({ folderId }) => {
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("");

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!image || !imageName) {
            alert("Please enter a name and select an image.");
            return;
        }

        const formData = new FormData();
        formData.append("name", imageName);
        formData.append("image", image);
        formData.append("folderId", folderId); // Attach folderId

        try {
            await axios.post("http://localhost:5000/api/images/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Image uploaded successfully!");
            setImage(null);
            setImageName("");
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Image upload failed!");
        }
    };

    return (
        <div>
            <h2>Upload Image</h2>
            <form onSubmit={handleUpload}>
                <input
                    type="text"
                    placeholder="Image Name"
                    value={imageName}
                    onChange={(e) => setImageName(e.target.value)}
                    required
                />
                <input type="file" accept="image/*" onChange={handleImageChange} required />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default ImageUpload;
