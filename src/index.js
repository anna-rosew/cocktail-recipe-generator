function displayRecipe(response) {
    new Typewriter('#recipe', {
        strings: response.data.answer,
        autoStart: true,
        delay: 1,
      });
}

function generateRecipe (event){
    event.preventDefault();

    let recipeInput= document.querySelector("#recipe-input");

      let prompt= `Generate a recipe for a ${recipeInput.value} cocktail`
      let context = "You are an experienced bartender who's worked at bars around the world and won awards for your drinks. Generate an easy to follow recipe with a <section> with a list with the class of ingredients of the ingredients. Then a <br/> to seperate it from another another <section> with a list who's class is method, this should contain a numbered list of steps for making the cocktail. Each section should have a title in <h3>. Include a centred strong Enjoy your drink! at the bottom. The title of the drink should be in h2 at the top"
      let apiKey= "a53b648o522cd05fa66cde020a59ta02"
      let apiUrl= `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

      let recipeELement= document.querySelector("#recipe");
      recipeELement.innerHTML = `<h4>Generating a delicious recipe for ${recipeInput.value}...hold tight!</h4><img src="src/imgs/giphy.gif" alt="Dog shaking cocktail">`

      axios.get(apiUrl).then(displayRecipe);

}

let recipeFormElement = document.querySelector("#recipe-form");
recipeFormElement.addEventListener("submit", generateRecipe);

//Build some suggestions?