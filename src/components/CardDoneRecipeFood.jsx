import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

export default function CardDoneRecipeFood({ element, i }) {
  const {
    doneDate,
    image,
    name,
    category,
    alcoholicOrNot,
    tags } = element;

  return (
    <div data-testid={ `${i}-recipe-done-food-card` }>
      <img
        src={ image }
        alt="search"
        data-testid={ `${i}-horizontal-image` }
      />
      {alcoholicOrNot === '' ? (
      <p data-testid={ `${i}-horizontal-top-text` }>{`${nationality}  ${category}`}</p>
      ) : (
        <p data-testid={ `${i}-horizontal-top-text` }>{alcoholicOrNot}</p>
      )}
      <p data-testid={ `${i}-horizontal-name` }>{name}</p>
      <p data-testid={ `${i}-horizontal-done-date` }>{`Feita em: ${doneDate}`}</p>
        {tags.map((tag) => (
          <span data-testid={ `${i}-${tag}-horizontal-tag`}>{tag}</span>
        ))}
      <button
        type="button"
      >
        <img
          src={ shareIcon }
          alt="profile"
          data-testid={ `${i}-horizontal-share-btn` }
        />
      </button>
    </div>
  );
}

CardDoneRecipeFood.propTypes = {
  name: PropTypes.string,
  nameThumb: PropTypes.string,
  id: PropTypes.string,
  category: PropTypes.string,
  tagName: PropTypes.string,
  tags: PropTypes.string,
}.isRequired;
