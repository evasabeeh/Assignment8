import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Folder from "./Folder";
import ImageUpload from "./ImageUpload";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => { logout(); navigate("/"); }}>Logout</button>
            <Folder />
            <ImageUpload />
            <Search />
        </div>
    );
};

export default Dashboard;
