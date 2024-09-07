import React from 'react';
import './styles.css';
import { useState } from 'react';

function InputField(){



    return(
        <>
            <h3 className="selected">Selected Item: </h3>
            <input type="number" className="amountInput" placeholder="Enter amount" min="0"></input>
            <select className="units">
                <option value="grams">Grams (g)</option>
                <option value="pounds">Pounds (lbs)</option>
                <option value="cups">Cups</option>
                <option value="ounces">Ounces (oz)</option>
                <option value="ml">Liters</option>
                <option value="count">Count</option>
            </select>
            <button className="button addButton">Add</button>
        </>
    );
}

export default InputField;