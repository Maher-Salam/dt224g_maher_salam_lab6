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

//funktion för recept-API

async function getR





