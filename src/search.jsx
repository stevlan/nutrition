import React from 'react';
import './styles.css';
import { useState } from 'react';
import { table } from './table';

const API_KEY = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=nPemfe5FJlxyUIZiA4WFOOJ9iEbFOpeeNcOysthg&query=";

function Search(){
    const [searchText, setSearchText] = useState("");
    const [results, setResults] = useState([]);
    const [currentItem, setCurrentItem] = useState();

    const search = async (string) =>{
        setSearchText(string);
        if (!string.trim()) {
            setResults([]);
            return;
        }
        try{
            let formatted = string.replace(" ", "%20");
            const data = await getJSON(formatted);
            if (data && data.foods) {
                setResults(data.foods);
            } else {
                setResults([]); 
            }
        } catch (error){
            alert(error);
        }
        
    };

    const getJSON = async (string) =>{
        try{
            const response = await fetch(API_KEY + string);
            const data = await response.json(); 
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            return data;
        } catch(error){
            alert(error);
        }
    };

    const selectItem = (item, index)=>{
        let text = (item.hasOwnProperty("brandOwner") ? item.description + " from " + item.brandOwner : item.description);
        document.querySelector(".selected").textContent = "Selected item: " + text;
        setCurrentItem(item);
        // table.add(amount, event, data);

    }

    const addItem = () =>{
        try{
            let amount = document.querySelector(".amountInput").value;
            if(amount !== 0 && !amount){
                throw new Error("Enter a valid amount");
            }
            table.add(amount, currentItem)
        } catch(error){
            alert(error);
        }
    }

    return(
        <>
            <div class="searchBar">
                <h1>Search For Food</h1>
                <input type="text" className="foodInput" placeholder="Enter food item" onChange={(e) => search(e.target.value)} value={searchText}></input>
            </div>
            <div className="results">
                {results.length > 0 ? 
                (results.map((item, index) => 
                (<a key={index} href="# " onClick={() => selectItem(item, index)}>{item.description} {item.brandOwner ? `from ${item.brandOwner}` : ''}</a>))) : 
                (<p>No results</p>)}
            </div>
            <h3 className="selected">Selected Item: </h3>
            <input type="number" className="amountInput" placeholder="Enter amount" min="0"></input>
            <select className="units">
                <option value="grams">Grams (g)</option>
            </select>
            <button className="button addButton" onClick={addItem}>Add</button>
        </>
    );
}

export default Search;