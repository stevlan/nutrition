export class FoodItem{
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
            "Portion (pounds): " + this.portion + "\n" + 
            "Calories: " + this.cal + "\n" +
            "Protein (g): " + this.protein + "\n" + 
            "Fiber (g): " + this.fiber + "\n" + 
            "Fat (g): " + this.fat + "\n" +
            "Carbs (g) " + this.carb
        );
    }
}
