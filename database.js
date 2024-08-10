import { FoodItem } from "./foodItem.js";

export const database = (function(){

    const key = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=nPemfe5FJlxyUIZiA4WFOOJ9iEbFOpeeNcOysthg&query=";
    const table = []
    let totalCals = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbs = 0;
    let totalFiber = 0;
    let totalWeight = 0;

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
        }
    };

    const displayResults = function(data){
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
        try{
            let amount = prompt("How many pounds of this item do you want to add?");
            if(amount == "" || isNaN(parseFloat(amount))){
                throw new Error("Enter a valid amount!")
            }
            else if (amount !== null){
                amount = convertToGrams(amount);
                let num = Number(event.target.className)
                let nutrientArray = data[num].foodNutrients
                table.push(createItem(nutrientArray, amount, num, event.target.textContent));
                addToDOM();
            }
        }catch(error){
            alert(error);
        }
    }

    const createItem = function(arr, amount, num, name){

        let protein = arr.find((nutrient)=>nutrient.nutrientName == "Protein") ? arr.find((nutrient)=>nutrient.nutrientName == "Protein").value : 0;
        protein = userAmount(amount, protein);
    
        let fiber = arr.find((nutrient)=>nutrient.nutrientName == "Fiber, total dietary") ? arr.find((nutrient)=>nutrient.nutrientName == "Fiber, total dietary").value : 0;
        fiber = userAmount(amount, fiber);
    
        let carb = arr.find((nutrient)=>nutrient.nutrientName == "Carbohydrate, by difference") ? arr.find((nutrient)=>nutrient.nutrientName == "Carbohydrate, by difference").value : 0;
        carb = userAmount(amount,carb)
    
        let fat = arr.find((nutrient)=>nutrient.nutrientName == "Total lipid (fat)") ? arr.find((nutrient)=>nutrient.nutrientName == "Total lipid (fat)").value : 0;
        fat = userAmount(amount, fat);
    
        let cal = arr.find((nutrient)=>nutrient.nutrientName == "Energy") ? arr.find((nutrient)=>nutrient.nutrientName == "Energy").value : 0;
        cal = userAmount(amount, cal);
    
        const item = new FoodItem(name, amount, protein, fiber, cal, fat, carb);
        
        return item;
    }
    
    const convertToGrams = function(num){
        return num*453.592;
    }
    
    const userAmount = function(amount, num){
        return amount/100*num;
    }

    const addToDOM = function(){
        // let div = document.createElement("div");
        // div.className = "data";

        // let name = document.createElement("div");
        // name.textContent = table[table.length-1].name;
        // div.appendChild(name);

        // let calories = document.createElement("div");
        // let num = parseFloat((table[table.length-1].cal).toFixed(2));
        // calories.textContent = num + " kcals";
        // div.appendChild(calories);
        // totalCals += num;

        // let protein = document.createElement("div");
        // num = parseFloat((table[table.length-1].protein).toFixed(2));
        // protein.textContent = num + " g";
        // div.appendChild(protein);
        // totalProtein += num;

        // let fat = document.createElement("div");
        // num = parseFloat((table[table.length-1].fat).toFixed(2));
        // fat.textContent = num + " g";
        // div.appendChild(fat);
        // totalFat += num;

        // let carbs = document.createElement("div");
        // num = parseFloat((table[table.length-1].carb).toFixed(2));
        // carbs.textContent = num + " g";
        // div.appendChild(carbs);
        // totalCarbs += num;

        // let fiber = document.createElement("div");
        // num = parseFloat((table[table.length-1].fiber).toFixed(2));
        // fiber.textContent = num + " g";
        // div.appendChild(fiber);
        // totalFiber += num;

        // let weight = document.createElement("div");
        // num = parseFloat((table[table.length-1].portion/453.592).toFixed(2));
        // weight.textContent = num + " lbs";
        // div.appendChild(weight);
        // totalWeight += num;
        
        // let parent = document.querySelector(".table");
        // parent.appendChild(div);

        let row = document.createElement("tr");

        let cell = document.createElement("td");
        let button = document.createElement("button");
        button.className="remove";
        button.textContent = "Remove";
        button.addEventListener("click", function(e){
            removeItem(e)
        })
        cell.className = "special";
        cell.appendChild(button);
        row.appendChild(cell)

        cell = document.createElement("td");
        cell.textContent = table[table.length-1].name;
        row.appendChild(cell);

        cell = document.createElement("td");
        let num = format(table[table.length-1].cal);
        cell.textContent = num + " kcals";
        row.appendChild(cell);
        totalCals += num;

        cell = document.createElement("td");
        num = format(table[table.length-1].protein);
        cell.textContent = num + " g";
        row.appendChild(cell);
        totalProtein += num;

        cell = document.createElement("td");
        num = format(table[table.length-1].fat);
        cell.textContent = num + " g";
        row.appendChild(cell);
        totalFat += num;

        cell = document.createElement("td");
        num = format(table[table.length-1].carb);
        cell.textContent = num + " g";
        row.appendChild(cell);
        totalCarbs += num;

        cell = document.createElement("td");
        num = format(table[table.length-1].fiber);
        cell.textContent = num + " g";
        row.appendChild(cell);
        totalFiber += num;

        cell = document.createElement("td");
        num = format(table[table.length-1].portion/453.592);
        cell.textContent = num + (num==1 ? " lb" : " lbs");
        row.appendChild(cell);
        totalWeight += num;
        
        let parent = document.querySelector("tbody");
        parent.appendChild(row);

        updateTotal();
    }

    const format = function(num){
        return parseFloat(num.toFixed(2))
    }

    const removeItem = function(event){

        let row = event.target.parentNode.parentNode;
        let index = Array.prototype.indexOf.call(row.parentNode.children, row);

        let num = format(table[index].cal);
        totalCals -= num;

        num = format(table[index].protein);
        totalProtein -= num;

        num = format(table[index].fat);
        totalFat -= num;

        num = format(table[index].carb);
        totalCarbs -= num;

        num = format(table[index].fiber);
        totalFiber -= num;

        num = format(table[index].portion/453.592);
        totalWeight -= num;

        table.splice(index,1);

        row.remove();

        updateTotal();
    }

    const updateTotal = function(){
        // let item = document.querySelector(".caloriesAmount");
        // item.textContent = totalCals + " kcals";

        // item = document.querySelector(".proteinAmount");
        // item.textContent = totalProtein + " g";

        // item = document.querySelector(".fatAmount");
        // item.textContent = totalFat + " g";

        // item = document.querySelector(".carbsAmount");
        // item.textContent = totalCarbs + " g";

        // item = document.querySelector(".fiberAmount");
        // item.textContent = totalFiber + " g";

        // item = document.querySelector(".weightAmount");
        // item.textContent = totalWeight + " lbs";

        let item = document.querySelector(".itemsAmount");
        item.textContent = format(table.length) + (table.length == 1 ? " item" : " items");

        item = document.querySelector(".caloriesAmount");
        item.textContent = format(totalCals) + " kcals";

        item = document.querySelector(".proteinAmount");
        item.textContent = format(totalProtein) + " g";

        item = document.querySelector(".fatAmount");
        item.textContent = format(totalFat) + " g";

        item = document.querySelector(".carbsAmount");
        item.textContent = format(totalCarbs) + " g";

        item = document.querySelector(".fiberAmount");
        item.textContent = format(totalFiber) + " g";

        item = document.querySelector(".weightAmount");
        item.textContent = format(totalWeight) + (format(totalWeight) == 1 ? " lb" : " lbs");
    }
    
    return { search };

})();









