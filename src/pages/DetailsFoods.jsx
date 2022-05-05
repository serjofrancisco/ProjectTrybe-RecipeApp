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
import { toggleFood } from '../helpers/favoriteToggle';

function DetailsFoods() {
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
    searchFood('lookup', 'i', id)
      .then(({ meals }) => setReceipe(meals[0]));
    searchDrink('search', 's', '')
      .then(({ drinks }) => setRecommendations(drinks.filter((_el, i) => i < SIX)));
  }

  const checkFavoriteRecipe = (id) => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFav = favRecipes?.some((recipe) => recipe.id === id);
    setFavorite(isFav);
  };

  const toggleFavorite = () => {
    toggleFood(params.id, receipe, favorite);
    setFavorite((prevState) => !prevState);
  };

  function updateButton(id) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const isDone = doneRecipes?.some((recipe) => recipe.id === id);

    let isInProgress = false;
    if (localStorage.getItem('inProgressRecipes')) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      isInProgress = Object.keys(inProgressRecipes.meals)
        .some((idMeal) => idMeal === id);
    }

    setButtonStatus({
      showButton: !isDone,
      continueRecipe: isInProgress,
    });
  }

  const shareRecipe = () => {
    setCopied(true);
    const link = `http://localhost:3000/foods/${receipe.idMeal}`;
    navigator.clipboard.writeText(link);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      key={ ele.idDrink }
    >
      <img
        src={ ele.strDrinkThumb }
        alt="search"
      />
      <p
        data-testid={ `${i}-recomendation-title` }
      >
        { ele.strDrink }
      </p>
    </div>
  ));
  const youtubeLink = receipe.strYoutube?.split('=')[1];
  const style = {
    bottom: '0px',
    position: 'fixed',
  };
  return (
    <div>
      <h2
        data-testid="recipe-title"
      >
        { receipe.strMeal }
      </h2>
      <img
        data-testid="recipe-photo"
        src={ receipe.strMealThumb }
        alt={ `receita ${receipe.strMeal}` }
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
        onClick={ () => toggleFavorite() }
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
        { receipe.strAlcoholic }
      </h3>
      { ingredients }
      <h3
        data-testid="instructions"
      >
        { receipe.strInstructions }
      </h3>
      <iframe
        width="560"
        height="315"
        data-testid="video"
        src={ `https://www.youtube.com/embed/${youtubeLink}` }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write;
          encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
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
      {(buttonStatus.showButton) && (
        <Link to={ `/foods/${receipe.idMeal}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            style={ style }
          >
            { (buttonStatus.continueRecipe) ? ('Continue Recipe') : ('Start Recipe') }
          </button>
        </Link>
      )}
    </div>
  );
}

export default DetailsFoods;
