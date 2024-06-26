// Function to get the user's country and set the age restriction
async function setAgeRestriction() {
  try {
    const response = await axios.get(
      "https://ipinfo.io/json?token=e9d62aa64f9560"
    );
    const country = response.data.country;

    const ageVerificationText = document.getElementById(
      "age-verification-text"
    );
    if (country === "US") {
      ageVerificationText.innerHTML =
        "You must be 21 or older to enter this site.";
      window.ageRestriction = 21;
    } else {
      ageVerificationText.innerHTML =
        "You must be 18 or older to enter this site.";
      window.ageRestriction = 18;
    }
  } catch (error) {
    console.error("Error fetching location data:", error);
    // Default to 18 if location data cannot be fetched
    const ageVerificationText = document.getElementById(
      "age-verification-text"
    );
    ageVerificationText.innerHTML =
      "You must be 18 or older to enter this site.";
    window.ageRestriction = 18;
  }
}

// Call the function to set the age restriction when the page loads
window.onload = setAgeRestriction;

function verifyAge(isVerified) {
  if (isVerified) {
    document.getElementById("age-alert").style.display = "none";
    document.getElementById("main-content").style.display = "block";
  } else {
    alert(
      "Oops, looks like you'll just have to come back when you get a little older!"
    );
    // Optionally, you can redirect the user to another page or close the tab.
    window.location.href = "https://www.google.com";
  }
}

function displayRecipe(response) {
  const recipeElement = document.querySelector("#recipe");
  recipeElement.innerHTML = response.data.answer;
  console.log(response.data.answer);
  new Typewriter("#recipe", {
    strings: response.data.answer,
    autoStart: true,
    delay: 20,
  }); // Assuming the API returns the recipe in a property called 'text'
}

function generateRecipe(event) {
  event.preventDefault();

  let recipeInput = document.querySelector("#recipe-input");
  let prompt = `Generate a recipe for a ${recipeInput.value} cocktail`;
  let context =
    "You are an experienced bartender who's worked at bars around the world and won awards for your drinks. Generate an easy to follow recipe with a <section> with a list with the class of ingredients of the ingredients. Then a <br/> to seperate it from another another <section> with a list who's class is method, this should contain a numbered list of steps for making the cocktail. Each section should have a title in <h3>. Include a centred strong Enjoy your drink! at the bottom. The title of the drink should be in h2 at the top";
  let apiKey = "a53b648o522cd05fa66cde020a59ta02";
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let recipeElement = document.querySelector("#recipe");
  recipeElement.innerHTML = `<h4>Generating a delicious recipe for ${recipeInput.value}...hold tight!</h4><img src="src/imgs/giphy.gif" alt="Dog shaking cocktail" class="loading-image">`;

  axios.get(apiUrl).then(displayRecipe);
}

let recipeFormElement = document.querySelector("#recipe-form");
recipeFormElement.addEventListener("submit", generateRecipe);
