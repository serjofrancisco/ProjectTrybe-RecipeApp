import React, { useEffect, useContext, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './Details.css';
import { useRouteMatch, Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import { searchFood } from '../services/TheMealDBApi';
import { searchDrink } from '../services/TheCockTailDBAPI';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DetailsDrinks() {
  const { params } = useRouteMatch();

  const {
    receipe, setReceipe,
    recommendations,
    setRecommendations,
  } = useContext(MyContext);

  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState();
  const SIX = 6;
  const [buttonStatus, setButtonStatus] = useState({
    showButton: false,
    continueRecipe: true,
  });

  function fillReceipe(id) {
    searchDrink('lookup', 'i', id)
      .then(({ drinks }) => setReceipe(drinks[0]));
    searchFood('search', 's', '')
      .then(({ meals }) => setRecommendations(meals.filter((_el, i) => i < SIX)));
  }

  function updateButton(id) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const isDone = doneRecipes?.some((recipe) => recipe.id === id);

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let isInProgress = false;
    if (inProgressRecipes) {
      isInProgress = Object.keys(inProgressRecipes.cocktails)
        .some((idDrink) => idDrink === id);
    }

    setButtonStatus({
      showButton: !isDone,
      continueRecipe: isInProgress,
    });
  }

  const checkFavoriteRecipe = (id) => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFav = favRecipes?.some((recipe) => recipe.id === id);
    setFavorite(isFav);
  };

  const shareRecipe = () => {
    setCopied(true);
    const link = `http://localhost:3000/drinks/${receipe.idDrink}`;
    navigator.clipboard.writeText(link);
  };

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
    fillReceipe(params.id);
    updateButton(params.id);
    checkFavoriteRecipe(params.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ingredients = Object.keys(receipe)
    .filter((key) => (
      receipe[key] && key.includes('strIngredient')
    ))
    .map((ingredientKey, index) => {
      const measureKey = `strMeasure${index + 1}`;
      return (
        <div
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          { `${receipe[ingredientKey]} ${receipe[measureKey]}` }
        </div>);
    });
  const recommendationsList = recommendations.map((ele, i) => (
    <div
      data-testid={ `${i}-recomendation-card` }
      key={ ele.idMeal }
    >
      <img
        src={ ele.strMealThumb }
        alt="search"
      />
      <p
        data-testid={ `${i}-recomendation-title` }
      >
        { ele.strMeal }
      </p>
    </div>
  ));

  const style = {
    bottom: '0px',
    position: 'fixed',
  };
  return (
    <div>
      <h2
        data-testid="recipe-title"
      >
        {(receipe.strDrink)}
      </h2>
      <img
        data-testid="recipe-photo"
        src={ receipe.strDrinkThumb }
        alt={ `receita ${receipe.strDrink}` }
      />
      <button
        type="button"
        data-testid="share-btn"
        onClick={ shareRecipe }
      >
        Compartilhar
      </button>
      {(copied) && (<span>Link copied!</span>)}
      <button
        type="button"
        onClick={ () => toggleFavorite(params.id) }
      >
        <img
          alt="favorite"
          src={ (favorite)
            ? blackHeartIcon : whiteHeartIcon }
          data-testid="favorite-btn"
        />
      </button>
      <h3
        data-testid="recipe-category"
      >
        { receipe.strCategory }
        { receipe?.strAlcoholic }
      </h3>
      { ingredients }
      <h3
        data-testid="instructions"
      >
        {receipe.strInstructions}
      </h3>
      {
        <Carousel showThumbs={ false }>
          <div>
            { recommendationsList[0] }
            { recommendationsList[1] }
          </div>
          <div>
            {recommendationsList[2] }
            { recommendationsList[3] }
          </div>
          <div>
            {recommendationsList[4] }
            { recommendationsList[5] }
          </div>
        </Carousel>
      }
      { (buttonStatus.showButton) && (
        <Link to={ `/drinks/${receipe.idDrink}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            style={ style }
          >
            { (buttonStatus.continueRecipe) ? ('Continue Recipe') : ('Start Recipe') }
          </button>
        </Link>
      ) }
    </div>
  );
}
export default DetailsDrinks;
