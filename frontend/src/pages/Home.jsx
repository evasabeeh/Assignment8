import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImageUpload from "../components/ImageUpload";

const Home = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [folders, setFolders] = useState([]);
    const [newFolderName, setNewFolderName] = useState("");

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            fetchFolders();
        }
    }, [user]);

    const fetchFolders = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/folders", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setFolders(res.data);
        } catch (error) {
            console.error("Error fetching folders:", error);
        }
    };

    const createFolder = async () => {
        if (!newFolderName) return;

        try {
            await axios.post("http://localhost:5000/api/folders", { name: newFolderName }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setNewFolderName("");
            fetchFolders(); // Refresh folders
        } catch (error) {
            console.error("Error creating folder:", error);
        }
    };

    return (
        <div>
            <h1>Welcome, {user?.name}</h1>
            <button onClick={() => { logout(); navigate("/login"); }}>Logout</button>

            <div>
                <h2>Create Folder</h2>
                <input
                    type="text"
                    placeholder="Folder Name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                />
                <button onClick={createFolder}>Create</button>
            </div>

            <div>
                <h2>Your Folders</h2>
                {folders.map((folder) => (
                    <div key={folder._id}>
                        <h3>{folder.name}</h3>
                        <ImageUpload folderId={folder._id} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
