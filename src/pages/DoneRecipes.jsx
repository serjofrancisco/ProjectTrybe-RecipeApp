import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

import CardDoneRecipeFood from '../components/CardDoneRecipeFood';

function DoneRecipes() {
  const [recipesDone, setRecipesDone] = useState([]);

  const filterFood = () => {
    const recipes = localStorage.getItem('doneRecipes');
    const foods = JSON.parse(recipes).filter((recipe) => recipe.type === 'food');
    setRecipesDone(foods);
  };

  const filterDrink = () => {
    const recipes = localStorage.getItem('doneRecipes');
    const drinks = JSON.parse(recipes).filter((recipe) => recipe.type === 'drink');
    setRecipesDone(drinks);
  };

  const handleDone = () => {
    const recipes = localStorage.getItem('doneRecipes');
    setRecipesDone(JSON.parse(recipes));
  };

  useEffect(() => {
    handleDone();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="profile_done_favs_main_container">
      <Header title="Done Recipes" />
      <nav className="done_btns_container">
        <button
          className="done_btns"
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ handleDone }
        >
          All
        </button>
        <button
          className="done_btns"
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ filterFood }
        >
          Foods
        </button>
        <button
          className="done_btns"
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ filterDrink }
        >
          Drinks
        </button>
      </nav>
      <main>
        {
          recipesDone?.map((element, i) => (
            <CardDoneRecipeFood element={ element } i={ i } key={ element.id } />
          ))
        }
      </main>
    </div>
  );
}

export default DoneRecipes;
