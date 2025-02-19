import { useState } from "react";
import axios from "axios";

const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const searchImages = async () => {
        const res = await axios.get(`http://localhost:5000/api/images/search?name=${query}`);
        setResults(res.data);
    };

    return (
        <div>
            <input type="text" placeholder="Search Images" onChange={(e) => setQuery(e.target.value)} />
            <button onClick={searchImages}>Search</button>
            <ul>
                {results.map((image) => (
                    <li key={image._id}>
                        <img src={`http://localhost:5000${image.imageUrl}`} alt={image.name} width="100" />
                        {image.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
