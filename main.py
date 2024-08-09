import requests
import json


class FDC:

    # apiKey = "nPemfe5FJlxyUIZiA4WFOOJ9iEbFOpeeNcOysthg"
    # food = "https://api.nal.usda.gov/fdc/v1/food/######?api_key=nPemfe5FJlxyUIZiA4WFOOJ9iEbFOpeeNcOysthg"
    # foodList = "https://api.nal.usda.gov/fdc/v1/foods/list?api_key=DEMO_KEY"
    # foodSearch = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=nPemfe5FJlxyUIZiA4WFOOJ9iEbFOpeeNcOysthg&query="

    # https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=Cheddar%20Cheese

    def __init__(self):
        self.food = "https://api.nal.usda.gov/fdc/v1/food/"
        self.foodList = "https://api.nal.usda.gov/fdc/v1/foods/list?api_key=DEMO_KEY"
        self.foodSearch = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=nPemfe5FJlxyUIZiA4WFOOJ9iEbFOpeeNcOysthg&query="
    
    def findFood(self, food):
        foodLink = self.foodSearch + food.replace(" ", "%20")
        response = requests.get(foodLink)
        data = response.json()
        return data
        
    def findID(self, id):
        url = self.food + id + "?api_key=nPemfe5FJlxyUIZiA4WFOOJ9iEbFOpeeNcOysthg"
        response = requests.get(url)
        data = response.json()
        return data

    # display first x number of search options. either get fdcid and search for nutrients or just access array based on what number child was selected. 


fdc = FDC()
result = fdc.findFood("chicken")
idResult = fdc.findFood("2029648")

with open('food_data.json', 'w') as json_file:
    json.dump(result, json_file, indent=4)

with open("id.json", "w") as json_file:
    json.dump(idResult, json_file, indent=4)
