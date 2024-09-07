import React from 'react';
import './styles.css';
import { useState } from 'react';

function Search(){
    const [item, setItem] = useState("");


    return(
        <>
            <div class="searchBar">
                <h1>Search For Food</h1>
                <input type="text" className="foodInput" placeholder="Enter food item"></input>
                <button className="button">Search</button>
            </div>
            <div className="results">
        
            </div>
        </>
    );
}

export default Search;