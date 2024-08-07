class FoodItem{
    constructor(name, portion, protein, fiber, cal, fat, carb){
        this.name = name;
        this.portion = portion;
        this.protein = protein;
        this.fiber = fiber;
        this.cal = cal;
        this.fat = fat;
        this.carb = carb;
    }

    print(){
        console.log("Item: " + this.name + "\n" + 
            "Portion (pounds): " + this.portion/453.592 + "\n" + 
            "Calories: " + this.cal + "\n" +
            "Protein (g): " + this.protein + "\n" + 
            "Fiber (g): " + this.fiber + "\n" + 
            "Fat (g): " + this.fat + "\n" +
            "Carbs (g) " + this.carb
        );
    }
}

let foodSearch = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=nPemfe5FJlxyUIZiA4WFOOJ9iEbFOpeeNcOysthg&query=";

let btn = document.querySelector(".button");
btn.addEventListener("click", search);

async function search(){
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
    
}

async function getJSON(string){
    try{
        const response = await fetch(foodSearch + string);
        const data = await response.json(); 
        if(data.foods.length == 0){
            throw new Error("No matching results!")
        }
        return data;
    } catch(error){
        alert(error);
        return null;
    }
}

async function displayResults(data){
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

function addItem(event, data){
    let amount = prompt("How many pounds of this item do you want to add?")
    amount = convertToGrams(amount);
    let num = Number(event.target.className)
    let nutrientArray = data[num].foodNutrients
    createItem(nutrientArray, amount, num, event.target.textContent);
}

function createItem(arr, amount, num, name){

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

function convertToGrams(num){
    return num*453.592;
}

function userAmount(amount, num){
    return amount/100*num;
}







