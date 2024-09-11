import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const delay = setTimeout(() => {
            if (searchTerm) {
                navigate(`/search?s=${encodeURIComponent(searchTerm)}`);
            }
        }, 500);

        return () => clearTimeout(delay);
    }, [searchTerm, navigate]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div id="search">
            <label htmlFor="search-input">Search</label>
            <input
                id="search-input"
                type="text"
                name="search"
                value={searchTerm}
                onChange={handleChange}
                aria-label="Search input"
            />
        </div>
    );
};

export default Search;
