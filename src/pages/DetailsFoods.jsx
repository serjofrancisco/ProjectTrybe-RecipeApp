import React, { useEffect, useContext, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useRouteMatch, Link } from 'react-router-dom';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { FiShare2 } from 'react-icons/fi';
import MyContext from '../contexts/MyContext';
import { searchFood } from '../services/TheMealDBApi';
import { searchDrink } from '../services/TheCockTailDBAPI';
import { toggleFood } from '../helpers/favoriteToggle';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';

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
      .then(({ drinks }) => setRecommendations(drinks.slice(0, SIX)));
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
      className="details_recommendation_container"
      data-testid={ `${i}-recomendation-card` }
      key={ ele.idDrink }
    >
      <img
        src={ ele.strDrinkThumb }
        alt="search"
      />
      <p
        className="details_recommendation_title"
        data-testid={ `${i}-recomendation-title` }
      >
        { ele.strDrink }
      </p>
    </div>
  ));
  const youtubeLink = receipe.strYoutube?.split('=')[1];
  // const style = {
  //   bottom: '0px',
  //   position: 'fixed',
  // };
  return (
    <div className="details_container">
      <div className="details_header_container">
        <img
          className="details_img"
          data-testid="recipe-photo"
          src={ receipe.strMealThumb }
          alt={ `receita ${receipe.strMeal}` }
        />
        <div className="details_title_container">
          <h2
            className="details_title"
            data-testid="recipe-title"
          >
            { receipe.strMeal }
          </h2>
          {/* <div className="details_container_icons"> */}
          <button
            className="details_btn"
            type="button"
            data-testid="share-btn"
            onClick={ shareRecipe }
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
            onClick={ () => toggleFavorite() }
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
            {/* <img
                className="details_icon"
                alt="favorite"
                src={ (favorite) ? blackHeartIcon : whiteHeartIcon }
                data-testid="favorite-btn"
              /> */}
          </button>
        </div>
        {/* </div> */}
        <div
          className="details_category"
          data-testid="recipe-category"
        >
          { receipe.strCategory }
          { receipe.strAlcoholic }
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
        { receipe.strInstructions }
      </div>
      <div className="details_extra">
        <iframe
          width="360"
          height="320"
          data-testid="video"
          src={ `https://www.youtube.com/embed/${youtubeLink}` }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write;
          encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
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
      </div>
      <div className="details_start_recipe_container">
        {(buttonStatus.showButton) && (
          <Link
            to={ `/foods/${receipe.idMeal}/in-progress` }
          >
            <button
              className="details_start_recipe_btn"
              type="button"
              data-testid="start-recipe-btn"
              // style={ style }
            >
              { (buttonStatus.continueRecipe) ? ('Continue Recipe') : ('Start Recipe') }
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default DetailsFoods;
