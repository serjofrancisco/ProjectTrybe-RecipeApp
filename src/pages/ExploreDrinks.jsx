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
    <div>
      <Header title="Explore Drinks" />
      <Link to="/explore/drinks/ingredients">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ surpriseDrink }
      >
        Surprise me!
      </button>
      <Footer existeFooter="true" />
    </div>
  );
}

export default ExploreDrinks;
