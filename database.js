import { FoodItem } from "./foodItem.js";

export const database = (function(){

    const key = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=nPemfe5FJlxyUIZiA4WFOOJ9iEbFOpeeNcOysthg&query=";


    const search = async function (){
        try{
            let input = document.querySelector(".foodInput");
            let searchText = input.value;
            if(!searchText){
                throw new Error("Add something to search for!")
            }
            searchText = searchText.replace(" ", "%20");
            await displayResults(await getJSON(searchText));
            //add every page?
        } catch (error){
            alert(error);
            return null;
        }
        
    };

    const getJSON = async function(string){
        try{
            const response = await fetch(key + string);
            const data = await response.json(); 
            if(data.foods.length == 0){
                throw new Error("No matching results!")
            }
            return data;
        } catch(error){
            alert(error);
            return null;
        }
    };

    const displayResults = async function(data){
        let parent = document.querySelector(".results");
        parent.innerHTML = "";
        let arr = data.foods
        for(let i=0; i<arr.length; i++){
            let option = document.createElement("a");
            option.className = i;
            option.href="# "
            option.textContent = arr[i].hasOwnProperty("brandOwner") ? arr[i].description + " from " + arr[i].brandOwner : arr[i].description;
            option.addEventListener("click", function(e){
                addItem(e, arr)
            });
            parent.appendChild(option);
        }
        parent.style.visibility = "visible";
    
        //when link clinked alert a notif asking for how much
    }

    const addItem = function(event, data){
        let amount = prompt("How many pounds of this item do you want to add?")
        amount = convertToGrams(amount);
        let num = Number(event.target.className)
        let nutrientArray = data[num].foodNutrients
        createItem(nutrientArray, amount, num, event.target.textContent);
    }

    const createItem = function(arr, amount, num, name){

        let protein = arr.find((nutrient)=>nutrient.nutrientName == "Protein").value;
        protein = userAmount(amount, protein);
    
        let fiber = arr.find((nutrient)=>nutrient.nutrientName == "Fiber, total dietary").value;
        fiber = userAmount(amount, fiber);
    
        let carb = arr.find((nutrient)=>nutrient.nutrientName == "Carbohydrate, by difference").value;
        carb = userAmount(amount,carb)
    
        let fat = arr.find((nutrient)=>nutrient.nutrientName == "Total lipid (fat)").value;
        fat = userAmount(amount, fat);
    
        let cal = arr.find((nutrient)=>nutrient.nutrientName == "Energy").value;
        cal = userAmount(amount, cal);
    
        const item = new FoodItem(name, amount, protein, fiber, cal, fat, carb);
        item.print();
        
    }
    
    const convertToGrams = function(num){
        return num*453.592;
    }
    
    const userAmount = function(amount, num){
        return amount/100*num;
    }
    
    return { search };

})();









