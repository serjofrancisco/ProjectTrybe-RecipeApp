import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getSurpriseFood } from '../services/TheMealDBApi';

function ExploreFoods() {
  const fetchSurpriseFood = async () => {
    const { meals } = await getSurpriseFood();
    return meals[0];
  };
  // fetchSurpriseFood();
  const history = useHistory();
  const surpriseFood = async () => {
    const meal = await fetchSurpriseFood();
    const id = meal.idMeal;
    history.push(`/foods/${id}`);
  };
  return (
    <div>
      <Header title="Explore Foods" />
      <Link to="/explore/foods/ingredients">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </button>
      </Link>
      <Link to="/explore/foods/nationalities">
        <button
          type="button"
          data-testid="explore-by-nationality"
        >
          By Nationality
        </button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ surpriseFood }
      >
        Surprise me!
      </button>
      <Footer existeFooter="true" />
    </div>
  );
}

export default ExploreFoods;
