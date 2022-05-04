import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

import CardDoneRecipeFood from '../components/CardDoneRecipeFood';

function DoneRecipes() {
  const [recipesDone, setRecipesDone] = useState([]);

  const doneRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  const handleFood = () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const recipes = localStorage.getItem('doneRecipes');
    setRecipesDone(JSON.parse(recipes));
  };

  useEffect(() => {
    handleFood();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header title="Done Recipes" />
      <nav>
        <button
          data-testid="filter-by-all-btn"
          type="button"
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
        >
          Foods
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drinks
        </button>
      </nav>
      <main>
        {
          recipesDone.map((element, i) => (
            <CardDoneRecipeFood element={ element } i={ i } key={ element.id } />
          ))
        }
      </main>
    </div>
  );
}

export default DoneRecipes;
