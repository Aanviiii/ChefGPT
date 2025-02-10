let ingredients = [];

      document
        .getElementById("addIngredient")
        .addEventListener("click", function () {
          document.getElementById("ingredientInputContainer").style.display =
            "block";
        });

      document
        .getElementById("createCard")
        .addEventListener("click", function () {
          let name = document.getElementById("ingredientName").value;
          let quantity = document.getElementById("ingredientQuantity").value;
          if (name && quantity) {
            let card = document.createElement("div");
            card.className = "ingredient-card";
            card.innerHTML = `<p>${name} - ${quantity}</p> <button onclick="removeIngredient('${name}')">Delete</button>`;
            document.getElementById("ingredientList").appendChild(card);
            ingredients.push({ name, quantity });
          }
        });

      function removeIngredient(name) {
        ingredients = ingredients.filter((ing) => ing.name !== name);
        document.getElementById("ingredientList").innerHTML = "";
        ingredients.forEach((ing) => {
          let card = document.createElement("div");
          card.className = "ingredient-card";
          card.innerHTML = `<p>${ing.name} - ${ing.quantity}</p> <button onclick="removeIngredient('${ing.name}')">Delete</button>`;
          document.getElementById("ingredientList").appendChild(card);
        });
      }

      document
        .getElementById("generateRecipes")
        .addEventListener("click", function () {
          document.getElementById("recipesContainer").innerHTML =
            "<p>Fetching recipes...</p>";
          fetchRecipes();
        });

      async function fetchRecipes() {
        try {
          let ingredientList = ingredients
            .map((ing) => `${ing.name}=${ing.quantity}`)
            .join(",");
          let response = await fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientList}&number=5&apiKey=1fe2d70ac3e74cf2a6d86afb8ddd5d66`
          );
          let data = await response.json();
          displayRecipes(data);
        } catch (error) {
          document.getElementById("recipesContainer").innerHTML =
            "<p>Error fetching recipes. Try again.</p>";
        }
      }

      function displayRecipes(recipes) {
        let container = document.getElementById("recipesContainer");
        container.innerHTML = "";
        if (recipes.length === 0) {
          container.innerHTML =
            "<p>No recipes found. You need more ingredients.</p>";
          return;
        }
        recipes.forEach((recipe) => {
          let recipeCard = document.createElement("div");
          recipeCard.className = "recipe-card";
          recipeCard.innerHTML = `<img src="${recipe.image}" width="100" style="border-radius: 10px;"><p>${recipe.title}</p>`;
          container.appendChild(recipeCard);
        });
      }