import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getSurpriseDrink } from '../services/TheCockTailDBAPI';

function ExploreDrinks() {
  const history = useHistory();
  const fetchSurpriseDrink = async () => {
    const { drinks } = await getSurpriseDrink();
    return drinks[0];
  };

  const surpriseDrink = async () => {
    const drink = await fetchSurpriseDrink();
    const id = drink.idDrink;
    history.push(`/drinks/${id}`);
  };

  return (
    <div className="explore_df_main_container">
      <Header title="Explore Drinks" />
      <section className="profile_btns_container">
        <Link to="/explore/drinks/ingredients">
          <button
            className="explore_df_btns"
            type="button"
            data-testid="explore-by-ingredient"
          >
            By Ingredient
          </button>
        </Link>
        <button
          className="explore_df_btns"
          type="button"
          data-testid="explore-surprise"
          onClick={ surpriseDrink }
        >
          Surprise me!
        </button>
      </section>
      <Footer existeFooter="true" />
    </div>
  );
}

export default ExploreDrinks;
