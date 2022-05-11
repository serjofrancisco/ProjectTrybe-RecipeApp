import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/Foods.css';

export default function CardFood({ element, i }) {
  const { strMealThumb, strMeal, idMeal } = element;

  return (
    <Link
      to={ `/foods/${idMeal}` }
      className="foods_card_container"
      style={ { textDecoration: 'none' } }
    >
      <div
        className="foods_card"
        data-testid={ `${i}-recipe-card` }
      >
        <p
          className="foods_card_title"
          data-testid={ `${i}-card-name` }
        >
          {strMeal}
        </p>
        <img
          className="foods_card_img"
          src={ strMealThumb }
          alt="search"
          data-testid={ `${i}-card-img` }
        />
      </div>
    </Link>
  );
}

CardFood.propTypes = {
  strMeal: PropTypes.string,
  strMealThumb: PropTypes.string,
}.isRequired;
