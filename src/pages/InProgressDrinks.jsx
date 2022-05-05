import React, { useState, useEffect } from 'react';
import './InProgress.css';
import { useRouteMatch } from 'react-router-dom';
import { searchDrink } from '../services/TheCockTailDBAPI';
import { toggleFood } from '../helpers/favoriteToggle';

export default function InProgressDrink() {
  const { params } = useRouteMatch();

  const [recipe, setRecipe] = useState([]);
  const [favorite, setFavorite] = useState();
  const [progress, setProgress] = useState([]);

  function fillRecipe(id) {
    searchDrink('lookup', 'i', id).then(({ drinks }) => setRecipe(drinks[0]));
  }

  const toggleFavorite = () => {
    toggleFood(params.id, recipe, favorite);
    setFavorite((prevState) => !prevState);
  };

  function checkFavoriteRecipe(id) {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFav = favRecipes?.some((rec) => rec.id === id);
    setFavorite(isFav);
  }

  function fillProgress(id) {
    const inProgress = localStorage.getItem('inProgressRecipes')
      ? JSON.parse(localStorage.getItem('inProgressRecipes'))
      : { cocktails: { [id]: [] } };

    if (!inProgress.cocktails) { inProgress.cocktails = { [id]: [] }; }
    setProgress(inProgress.cocktails[id]);
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }

  useEffect(() => {
    fillRecipe(params.id);
    checkFavoriteRecipe(params.id);
    fillProgress(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleProgress({ target: { checked, name, parentNode } }) {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    parentNode.classList.toggle('done');
    setProgress((prevState) => (
      checked ? [...prevState, name] : prevState.filter((prog) => prog !== name)
    ));
    inProgress.cocktails[params.id] = progress;
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }

  const ingredients = Object.keys(recipe)
    .filter((key) => recipe[key] && key.includes('strIngredient'))
    .map((ingredientKey, index) => {
      const measureKey = `strMeasure${index + 1}`;
      return (
        <div
          data-testid={ `${index}-ingredient-step` }
          key={ index }
        >
          <input
            type="checkbox"
            name={ index }
            onChange={ toggleProgress }
            checked={ progress.some((el) => Number(el) === Number(index)) }
          />
          <span>{ `${recipe[ingredientKey]} ${recipe[measureKey]}` }</span>
        </div>);
    });
  return (
    <div>
      <img
        src={ recipe.strDrinkThumb }
        data-testid="recipe-photo"
        alt={ `receita ${recipe.strDrink}` }
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
        onClick={ toggleFavorite }
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
