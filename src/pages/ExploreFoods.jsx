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
    <div className="explore_df_main_container">
      <Header title="Explore Foods" />
      <section className="profile_btns_container">
        <Link to="/explore/foods/ingredients">
          <button
            className="explore_df_btns"
            type="button"
            data-testid="explore-by-ingredient"
          >
            By Ingredient
          </button>
        </Link>
        <Link to="/explore/foods/nationalities">
          <button
            className="explore_df_btns"
            type="button"
            data-testid="explore-by-nationality"
          >
            By Nationality
          </button>
        </Link>
        <button
          className="explore_df_btns"
          type="button"
          data-testid="explore-surprise"
          onClick={ surpriseFood }
        >
          Surprise me!
        </button>
      </section>
      <Footer existeFooter="true" />
    </div>
  );
}

export default ExploreFoods;
