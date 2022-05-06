import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function CardFavorite({ element, i, handleDone }) {
  const {
    image,
    name,
    category,
    id,
    alcoholicOrNot,
    nationality,
    type } = element;
  const [copied, setCopied] = useState(false);
  const shareRecipe = ({ target }) => {
    setCopied(true);
    const link = `http://localhost:3000/${type}s/${target.id}`;
    navigator.clipboard.writeText(link);
  };
  const removeFav = ({ target }) => {
    const recipes = localStorage.getItem('favoriteRecipes');
    const newFavs = JSON.parse(recipes)
      .filter((recipe) => Number(recipe.id) !== Number(target.id));
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
    handleDone();
  };
  return (
    <div>
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
      <button
        type="button"
        id={ id }
        onClick={ removeFav }
      >
        <img
          src={ blackHeartIcon }
          data-testid={ `${i}-horizontal-favorite-btn` }
          alt="profile"
          id={ id }
        />
      </button>
      {copied && <span>Link copied!</span>}
    </div>
  );
}

CardFavorite.propTypes = {
  name: PropTypes.string,
  nameThumb: PropTypes.string,
  id: PropTypes.string,
  category: PropTypes.string,
  tagName: PropTypes.string,
  tags: PropTypes.string,
}.isRequired;
