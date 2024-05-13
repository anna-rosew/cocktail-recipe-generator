function generateRecipe (event){
    event.preventDefault();
    new Typewriter('#recipe', {
        strings: "This is how to make a Tom collins",
        autoStart: true,
        delay: 1,
      });

}

let recipeFormElement = document.querySelector("#recipe-form");
recipeFormElement.addEventListener("submit", generateRecipe);
