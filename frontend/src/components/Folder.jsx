import { useState, useEffect } from "react";
import axios from "axios";

const Folder = () => {
    const [folders, setFolders] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/folders").then((res) => setFolders(res.data));
    }, []);

    const createFolder = async () => {
        await axios.post("http://localhost:5000/api/folders", { name });
        setName("");
    };

    return (
        <div>
            <h2>Folders</h2>
            <input type="text" placeholder="Folder Name" onChange={(e) => setName(e.target.value)} />
            <button onClick={createFolder}>Create</button>
            <ul>
                {folders.map((folder) => (
                    <li key={folder._id}>{folder.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Folder;
