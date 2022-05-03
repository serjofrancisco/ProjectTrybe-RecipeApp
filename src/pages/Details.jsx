import React, { useEffect, useContext } from 'react';
// import Slider from 'react-slick';
import { Carousel } from 'react-responsive-carousel';
import { useLocation } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import { searchFood } from '../services/TheMealDBApi';
import { searchDrink } from '../services/TheCockTailDBAPI';

function Details() {
  const { pathname } = useLocation();
  const pathData = pathname.split('/');

  const {
    receipe, setReceipe,
    recommendations,
    setRecommendations,
  } = useContext(MyContext);
  const SIX = 6;
  // const DOTS = true;
  function fillReceipe(page, id) {
    if (page === 'foods') {
      searchFood('lookup', 'i', id)
        .then(({ meals }) => setReceipe(meals[0]));
      searchDrink('search', 's', '')
        .then(({ drinks }) => setRecommendations(drinks.filter((el, i) => i < SIX)));
    } else if (page === 'drinks') {
      searchDrink('lookup', 'i', id)
        .then(({ drinks }) => setReceipe(drinks[0]));
      searchFood('search', 's', '')
        .then(({ meals }) => setRecommendations(meals.filter((el, i) => i < SIX)));
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fillReceipe(pathData[1], pathData[2]), []);

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
      key={ pathData[1] === 'foods' ? ele.idDrink : ele.idMeal }
    >
      <img
        src={ pathData[1] === 'foods' ? ele.strDrinkThumb : ele.strMealThumb }
        alt="search"
      />
      <p
        data-testid={ `${i}-recomendation-title` }
      >
        { pathData[1] === 'foods' ? ele.strDrink : ele.strMeal }
      </p>
    </div>
  ));
  const youtubeLink = receipe.strYoutube?.split('=')[1];
  return (
    <div>
      <h2
        data-testid="recipe-title"
      >
        {(pathData[1] === 'foods') ? (receipe.strMeal) : (receipe.strDrink)}
      </h2>
      <img
        data-testid="recipe-photo"
        src={ (pathData[1] === 'foods') ? receipe.strMealThumb : receipe.strDrinkThumb }
        alt={ `receita ${(pathData[1] === 'foods')
          ? receipe.strMeal : receipe.strDrink}` }
      />
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar

      </button>
      <button
        type="button"
        // key={ g }
        data-testid="start-recipe-btn"
        // onClick={ handleClick }
      >
        iniciar receita
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
      { (pathData[1] === 'foods') && (
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
        />) }
      {/* pegamos desse site: https://react-slick.neostack.com/ */}
      { /* recommendationsList */ }
      {/* {
        <div>
          <h2> Single Item</h2>
          <Slider
            dots={ DOTS }
            slidesToShow={ 2 }
            slidesToScroll={ 2 }
            autoplay={ DOTS }
            autoplaySpeed={ 3000 }
          >
            { recommendationsList }
          </Slider>
        </div>
      } */}
      {
        <Carousel>
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
    </div>
  );
}

export default Details;
