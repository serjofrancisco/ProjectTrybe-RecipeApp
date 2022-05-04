import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

export default function CardDoneRecipeFood({ element, i }) {
  const {
    doneDate,
    image,
    name,
    category,
    id,
    alcoholicOrNot,
    nationality,
    type,
    tags } = element;
  const [copied, setCopied] = useState(false);
  const shareRecipe = ({ target }) => {
    setCopied(true);
    const link = `http://localhost:3000/${type}s/${target.id}`;
    navigator.clipboard.writeText(link);
  };

  return (
    <div data-testid={ `${i}-recipe-done-food-card` }>
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt="search"
          data-testid={ `${i}-horizontal-image` }
        />
      </Link>
      {alcoholicOrNot === '' ? (
        <p data-testid={ `${i}-horizontal-top-text` }>{`${nationality} - ${category}`}</p>
      ) : (
        <p data-testid={ `${i}-horizontal-top-text` }>{alcoholicOrNot}</p>
      )}
      <Link to={ `/${type}s/${id}` }>
        <p data-testid={ `${i}-horizontal-name` }>{name}</p>
      </Link>
      <p data-testid={ `${i}-horizontal-done-date` }>{`Feita em: ${doneDate}`}</p>
      {tags.map((tag) => (
        <span key={ tag } data-testid={ `${i}-${tag}-horizontal-tag` }>{tag}</span>
      ))}
      <button
        type="button"
        onClick={ shareRecipe }
        id={ id }
      >
        <img
          src={ shareIcon }
          data-testid={ `${i}-horizontal-share-btn` }
          alt="profile"
          id={ id }
        />
      </button>
      {copied && <span>Link copied!</span>}
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
