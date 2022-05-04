import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CardFood({ element, i }) {
  const { strMealThumb, strMeal, idMeal } = element;

  return (
    <Link to={ `/foods/${idMeal}` }>
      <div data-testid={ `${i}-recipe-card` }>
        <img
          src={ strMealThumb }
          alt="search"
          data-testid={ `${i}-card-img` }
        />
        <p data-testid={ `${i}-card-name` }>{strMeal}</p>
      </div>
    </Link>
  );
}

CardFood.propTypes = {
  strMeal: PropTypes.string,
  strMealThumb: PropTypes.string,
}.isRequired;
