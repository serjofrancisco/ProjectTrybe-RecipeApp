import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CardDrink({ element, i }) {
  const { strDrink, strDrinkThumb, idDrink } = element;
  return (
    <Link to={ `/drinks/${idDrink}` }>
      <div data-testid={ `${i}-recipe-card` }>
        <img
          src={ strDrinkThumb }
          alt="search"
          data-testid={ `${i}-card-img` }
        />
        <p data-testid={ `${i}-card-name` }>{strDrink}</p>
      </div>
    </Link>
  );
}

CardDrink.propTypes = {
  strDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
}.isRequired;
