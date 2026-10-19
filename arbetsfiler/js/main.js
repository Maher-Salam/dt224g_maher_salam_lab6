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
         if (data.recipes.length === 0){
            messageField.textContent = "Inga recept hittades, testa en annan sökning.";
            
        }  else if (data.recipes.length > 0) {
            messageField.textContent = "";
            
        }
        
        return data.recipes[0];
    
    }catch (error) {    
        console.error('Det uppstod ett fel:', error.message);
        messageField.textContent = "Ett fel uppstod vid hämtning: " + error.message;
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

    portionEl.innerHTML = "Servings: " + + recipeData.servings;
    prepTimeEl.innerHTML = "Prep time: " + recipeData.prepTimeMinutes + "minutes";
    cooktimeEl.innerHTML = "Tillagstid: " + recipeData.cookTimeMinutes + "minutes";
    difficultyEl.innerHTML = "Svårighetsgrad: " + recipeData.difficulty;

    h4ingredientsEl.innerHTML = "Ingredients";
    h4InstructionsEl.innerHTML = "Instructions";

    recipeData.ingredients.forEach ( (ingredient) => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        ingredientListEl.appendChild(li);
    });

    recipeData.instructions.forEach ( (instruction) => {
        const li = document.createElement("li");
        li.textContent = instruction;
        instructionListEl.appendChild(li);
    });

   
     recipeDivEl.style.display = "flex";
     recipeDivEl.style.flexDirection = "row";
     recipeDivEl.style.justifyContent = "space-between";
     recipeDivEl.style.backgroundColor = "grey";
     recipeDivEl.style.padding = "5px";
     recipeDivEl.style.borderRadius = "5px";
     recipeDivEl.style.fontWeight = "Bold";
    
    articleEl.append(h3El, imgEl, recipeDivEl, h4ingredientsEl, ingredientListEl, h4InstructionsEl, instructionListEl);

    recipeDivEl.append(portionEl, prepTimeEl, cooktimeEl, difficultyEl);
    
    recipeList.append(articleEl);
}

//rensar förra recept från DOM
function deleteRecipe() {
   recipeList.replaceChildren();
}

searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    

    if(validateForm() === true) {
     deleteRecipe();
     const recipeData = await getRecipe();

     if(recipeData !== undefined){
        createRecipe(recipeData);
     }
    } 
    
});

