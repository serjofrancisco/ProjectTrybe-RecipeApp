import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { FiShare2 } from 'react-icons/fi';
import { searchDrink } from '../services/TheCockTailDBAPI';
import { toggleDrink } from '../helpers/favoriteToggle';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
// import shareIcon from '../images/shareIcon.svg';

export default function InProgressDrink() {
  const { params } = useRouteMatch();

  const [recipe, setRecipe] = useState([]);
  const [favorite, setFavorite] = useState();
  const [progress, setProgress] = useState([]);
  const [copied, setCopied] = useState(false);

  function fillRecipe(id) {
    searchDrink('lookup', 'i', id).then(({ drinks }) => setRecipe(drinks[0]));
  }

  const toggleFavorite = () => {
    toggleDrink(params.id, recipe, favorite);
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

  function toggleProgress({ target: { checked, name } }) {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (checked) {
      setProgress((prevState) => [...prevState, name]);
      inProgress.cocktails[params.id] = [...progress, name];
    } else {
      const newFav = progress.filter((prog) => Number(prog) !== Number(name));
      setProgress(newFav);
      inProgress.cocktails[params.id] = newFav;
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }

  const shareRecipe = () => {
    setCopied(true);
    const link = `http://localhost:3000/drinks/${params.id}`;
    navigator.clipboard.writeText(link);
  };

  const ingredients = Object.keys(recipe)
    .filter((key) => recipe[key] && key.includes('strIngredient'))
    .map((ingredientKey, index) => {
      const measureKey = `strMeasure${index + 1}`;
      return (
        <div
          data-testid={ `${index}-ingredient-step` }
          key={ index }
          className={ progress.some((el) => Number(el) === index) ? 'done' : '' }
        >
          <input
            type="checkbox"
            name={ index }
            onChange={ toggleProgress }
            checked={ progress.some((el) => Number(el) === index) }
          />
          <span>{`  ${recipe[ingredientKey]} ${recipe[measureKey]}`}</span>
        </div>);
    });

  const history = useHistory();
  return (
    <div className="details_container">
      <div className="details_header_container">
        <img
          className="details_img"
          src={ recipe.strDrinkThumb }
          data-testid="recipe-photo"
          alt={ `receita ${recipe.strDrink}` }
        />
        <div className="details_title_container">
          <h4
            className="details_title"
            data-testid="recipe-title"
          >
            { recipe.strDrink }

          </h4>
          <button
            className="details_btn"
            type="button"
            onClick={ shareRecipe }
            data-testid="share-btn"
          >
            { copied
              ? (
                'Link copied!'
              )
              : (
                <FiShare2
                  size={ 30 }
                  className="details_icon"
                />
              )}
          </button>
          <button
            className="details_btn"
            type="button"
            onClick={ toggleFavorite }
          >
            { favorite
              ? (
                <MdFavorite
                  size={ 30 }
                  className="details_icon_checked"
                />
              )
              : (
                <MdOutlineFavoriteBorder
                  size={ 30 }
                  className="details_icon"
                />
              )}
          </button>
        </div>
        <div
          className="details_category"
          data-testid="recipe-category"
        >
          { recipe.strCategory }

        </div>
      </div>
      <div className="details_ingredients_container">
        <h5>
          Ingredients:
        </h5>
        { ingredients }
      </div>
      <div
        className="details_instructions"
        data-testid="instructions"
      >
        <h5>
          Instructions:
        </h5>
        { recipe.strInstructions }
      </div>
      <button
        className="in_progress_btn"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ progress.length < ingredients.length }
        onClick={ () => history.push('/done-recipes') }
      >
        Finish
      </button>
    </div>
  );
}
