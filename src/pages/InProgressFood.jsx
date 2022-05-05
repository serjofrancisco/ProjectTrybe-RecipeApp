import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { searchFood } from '../services/TheMealDBApi';

export default function InProgressFood() {
  const { params } = useRouteMatch();

  const [recipe, setRecipe] = useState([]);
  const [favorite, setFavorite] = useState();

  function fillRecipe(id) {
    searchFood('lookup', 'i', id)
      .then(({ meals }) => setRecipe(meals[0]));
  }

  function favoriteRecipe(id) {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFav = favRecipes?.some((fav) => fav.id === id);
    setFavorite(isFav);
  }

  const toggleFavorite = (id) => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorite) {
      const newFavs = favRecipes.filter((fav) => fav.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
    } else {
      const newFavs = [...favRecipes, {
        id,
        type: 'drink',
        nationality: receipe.strArea,
        category: receipe.strCategory,
        alcoholicOrNot: receipe.strAlcoholic,
        name: receipe.strDrink,
        image: receipe.strDrinkThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
    }
    setFavorite((prevState) => !prevState);
  };

  useEffect(() => {
    fillRecipe(params.id);
    checkFavoriteRecipe(params.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkFavoriteRecipe() {
    const favRecipes = localStorage.getItem('favoriteRecipes');
    const newFavs = [...favRecipes, recipe]
  }

  const ingredients = Object.keys(recipe)
    .filter((key) => (
      recipe[key] && key.includes('strIngredient')
    ))
    .map((ingredientKey, index) => {
      const measureKey = `strMeasure${index + 1}`;
      return (
        <div
          data-testid={ `${index}-ingredient-step` }
          key={ index }
        >
          <input
            type="checkbox"
            checked={ }
          />
          <span>
            { `${recipe[ingredientKey]} ${recipe[measureKey]}` }
          </span>
        </div>);
    });
  return (
    <div>
      <img
        src={ recipe.strMealThumb }
        data-testid="recipe-photo"
        alt={ `receita ${recipe.strMeal}` }
      />
      <h1 data-testid="recipe-title">oi</h1>
      <button
        type="button"
        data-testid="share-btn"
      >
        oi
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => setFavorite((prevState) => !prevState) }
      >
        oi
      </button>
      <p data-testid="recipe-category">{ recipe.strCategory }</p>
      { ingredients }
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        oi
      </button>
    </div>
  );
}
