import { table } from "./table.js";

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
            if (amount === null) {
                return;
            }
            else if(amount == "" || isNaN(parseFloat(amount))){
                throw new Error("Enter a valid amount!")
            }
            else if (amount !== null){
                table.add(amount, event, data);
            }
        }catch(error){
            alert(error);
        }
    }
    
    return { search };

})();









