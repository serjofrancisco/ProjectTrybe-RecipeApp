import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CardDrink({ element, i }) {
  const { strDrink, strDrinkThumb, idDrink } = element;
  return (
    <Link
      to={ `/drinks/${idDrink}` }
      className="card_container"
      style={ { textDecoration: 'none' } }
    >
      <div
        data-testid={ `${i}-recipe-card` }
        className="card_main"
      >
        <p
          data-testid={ `${i}-card-name` }
          className="card_title"
        >
          {strDrink}

        </p>
        <img
          className="card_img"
          src={ strDrinkThumb }
          alt="search"
          data-testid={ `${i}-card-img` }
        />
      </div>
    </Link>
  );
}

CardDrink.propTypes = {
  strDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
}.isRequired;
