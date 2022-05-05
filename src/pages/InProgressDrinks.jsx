import React from 'react';
import './InProgress.css';

export default function InProgressDrink() {
  return (
    <div>
      <img src="" data-testid="recipe-photo" alt="" />
      <h1 data-testid="recipe-title"> oi </h1>
      <button
        data-testid="share-btn"
        type="button"
      >
        oi
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
      >
        oi
      </button>
      <p data-testid="recipe-category" />

      <p data-testid={ `${index}-ingredient-step` } />
      <p data-testid="instructions" />
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        oi
      </button>
    </div>
  );
}
