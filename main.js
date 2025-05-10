
function addRecipe() {
    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
    const imageInput = document.getElementById('imageUpload');
    const reader = new FileReader();

    reader.onload = function () {
        const imageSrc = reader.result;
        const recipe = { title, ingredients, instructions, imageSrc };
        const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
    };

    if (imageInput.files[0]) {
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        reader.onload();
    }
}

function deleteRecipe(index) {
    const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
}

function displayRecipes() {
    const container = document.getElementById('recipes');
    container.innerHTML = '';
    const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    recipes.forEach((r, index) => {
        const div = document.createElement('div');
        div.className = 'recipe';
        div.innerHTML = `<h2>${r.title}</h2>
                         <p><strong>Zutaten:</strong><br>${r.ingredients.replace(/\n/g, '<br>')}</p>
                         <p><strong>Zubereitung:</strong><br>${r.instructions}</p>
                         ${r.imageSrc ? `<img src="${r.imageSrc}" style="max-width:100%;">` : ''}
                         <button onclick="deleteRecipe(${index})">Rezept löschen</button>`;
        container.appendChild(div);
    });
}

window.onload = displayRecipes;
