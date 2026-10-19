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
} else  {
    errorText.innerHTML = "";
    return true;
}
}

// visar felmeddelanden på sidan
/* function displayErrors() {
    if (data.recipes < 0) {
        messageField.textContent = "Inga recept hittades, testa en annan sökning.";
    } else {
        messageField.textContent = "";
    }
}*/

//hämatar recept från API
async function getRecipe() {
    try {
        let response = await fetch('https://dummyjson.com/recipes/search?q=' + searchInput.value);
        let data = await response.json();
        console.log(data.recipes[0]);

        return data.recipes[0];



    } catch (error) {    
        console.error(error);
        messageField.innerHTML = "ett fel uppstod vid hämtning"
    }
    
}

//bygger upp sidan i DOM 
function createRecipe() {

}

//rensar förra recept från DOM
function deleteRecipe() {

}

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if(validateForm() === true) {
        getRecipe();
        
    }
});



