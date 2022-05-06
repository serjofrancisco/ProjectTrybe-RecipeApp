import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CardFavorite from '../components/CardFavorite';

function Favorites() {
  const [recipesDone, setRecipesDone] = useState([]);

  const filterFood = () => {
    const recipes = localStorage.getItem('favoriteRecipes');
    const foods = JSON.parse(recipes).filter((recipe) => recipe.type === 'food');
    setRecipesDone(foods);
  };

  const filterDrink = () => {
    const recipes = localStorage.getItem('favoriteRecipes');
    const drinks = JSON.parse(recipes).filter((recipe) => recipe.type === 'drink');
    setRecipesDone(drinks);
  };

  const handleDone = () => {
    const recipes = localStorage.getItem('favoriteRecipes');
    setRecipesDone(JSON.parse(recipes));
  };

  useEffect(() => {
    handleDone();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <nav>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ handleDone }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ filterFood }
        >
          Foods
        </button>
        <button
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
            <CardFavorite
              element={ element }
              i={ i }
              key={ element.id }
              handleDone={ handleDone }
            />
          ))
        }
      </main>
    </div>
  );
}

export default Favorites;
