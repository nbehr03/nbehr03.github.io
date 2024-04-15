addEventListener('load', getMeal);

btn = document.querySelector("#js-new-meal");
btn.addEventListener('click', getMeal);

async function getMeal()
{

    const endpoint = "https://www.themealdb.com/api/json/v1/1/random.php";

    try
    {
        const response = await fetch(endpoint);

        if (!response.ok) //if response is not okay
        {
            throw Error(response.statusText);
        }

        const json = await response.json();

        displayMeal(json.meals[0]);

    }

    catch (err)
    {
        console.log(err);
        alert('Failed to fetch new meal');
    }

}


function displayMeal(meal) 
{
    const mealText = document.querySelector("#js-meal-text");

    const ingredients = [];

    for (let i = 0; i < 20; i++) 
    {
        const ingredient = meal[`strIngredient${i}`]; //gathering ingredients and how much
        const measure = meal[`strMeasure${i}`];

        if (ingredient && measure) //if no errors
        {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }

    const instructions = meal.strInstructions;
    const mealName = meal.strMeal;

    let mealHTML = `<h3>${mealName}</h3>`; //create header with mealName
    mealHTML += `<h4>Ingredients:</h4>`; // ingredients list
    mealHTML += `<ul>`;
    ingredients.forEach( ingredient => 
        {

        mealHTML += `<li>${ingredient}</li>`;

        }
    );
    mealHTML += `</ul>`;

    mealHTML += `<h4>Instructions:</h4>`; //adds instructions
    mealHTML += `<p>${instructions}</p>`;

    mealText.innerHTML = mealHTML; //updates the meal
}
