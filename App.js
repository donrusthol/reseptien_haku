import React, { useState } from 'react';
import axios from 'axios';

const SearchRecipes = () => {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);

  const searchByIngredient = async () => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      setRecipes(response.data.meals);
    } catch (error) {
      console.error(`Error fetching recipes: ${error}`);
    }
  };

  const handleInputChange = (event) => {
    setIngredient(event.target.value);
  };

  const handleSearchClick = () => {
    searchByIngredient();
  };

  return (
    <div>
      <input type="text" value={ingredient} onChange={handleInputChange} placeholder="Kirjoita raaka-aine" />
      <button onClick={handleSearchClick}>Hae reseptejä</button>
      {recipes && recipes.map((recipe) => (
        <div key={recipe.idMeal}>
          <h2>{recipe.strMeal}</h2>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        </div>
      ))}
    </div>
  );
};

export default SearchRecipes;