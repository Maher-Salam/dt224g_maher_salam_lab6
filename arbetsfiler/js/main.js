"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Maher Salam
 */

//hämta element från DOM
const errorText = document.querySelector("#error");

const searchForm = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");

const messageField = document.querySelector("#message");

const recipeList = document.querySelector("#recipe");

//Array för felmeddelanden
let errors = [];

//Array för recept
let recipe = [];

//funktion för validering av sökformulär
function validateForm() {

//kontrollerar ifall text skriven i submitfält
if (searchInput.value.trim() ===""){
    errorText.innerHTML = "Ange det recept ni söker i sökfältet";
    return false;
} else  {
    errorText.innerHTML = "";
    return true;
}
}

//hämatar recept från API
async function getRecipe() {
    try {
        const response = await fetch('https://dummyjson.com/recipes/search?q=' + searchInput.value);
        const data = await response.json();
        console.log(data);
        console.log(data.recipes);
         if (data.recipes.length === 0){
            messageField.textContent = "Inga recept hittades, testa en annan sökning.";
            
        }  else if (data.recipes.length > 0) {
            messageField.textContent = "";
            return data.recipes[0];
        }

    }catch (error) {    
        console.error(error);
        messageField.textContent = "Ett fel uppstod vid hämtning"
        return;
    }
    
}

//bygger upp sidan i DOM 
function createRecipe(recipeData) {
   const articleEl = document.createElement("article"); 

   const h3El = document.createElement("h3");
   const imgEl = document.createElement("img");

   const recipeDivEl = document.createElement("div");
   const portionEl = document.createElement("p");
   const prepTimeEl = document.createElement("p");
   const cooktimeEl = document.createElement("p");
   const difficultyEl = document.createElement("p");

   const h4ingredientsEl = document.createElement("h4");
   const ingredientListEl = document.createElement("ul");

   const h4InstructionsEl = document.createElement("h4");
   const instructionListEl = document.createElement("ol");

    h3El.innerHTML = recipeData.name;
    imgEl.src = recipeData.image;
    imgEl.alt = recipeData.name;

    portionEl.innerHTML = recipeData.servings;
    prepTimeEl.innerHTML = recipeData.prepTimeMinutes;
    cooktimeEl.innerHTML = recipeData.cookTimeMinutes;
    difficultyEl.innerHTML = recipeData.difficulty;

    h4ingredientsEl.innerHTML = "Ingredients";
    ingredientListEl.innerHTML = recipeData.ingredients;

    h4InstructionsEl.innerHTML = "Instructions";
    instructionListEl.innerHTML = recipeData.instructions;

}

//rensar förra recept från DOM
function deleteRecipe() {

}

searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    deleteRecipe();

    if(validateForm() === true) {
     const recipeData = await getRecipe();
     createRecipe(recipeData);
      
       
    } 
    
});

