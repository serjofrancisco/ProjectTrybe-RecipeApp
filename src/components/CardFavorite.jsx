import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import shareIcon from '../images/shareIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import { MdFavorite } from 'react-icons/md';
import { FiShare2 } from 'react-icons/fi';

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
    <div className="fav_card">
      <Link to={ `/${type}s/${id}` }>
        <img
          className="fav_card_img"
          src={ image }
          alt="search"
          data-testid={ `${i}-horizontal-image` }
        />
      </Link>
      <div className="fav_card_text_container">
        {alcoholicOrNot === '' ? (
          <div
            className="fav_card_category"
            data-testid={ `${i}-horizontal-top-text` }
          >
            {`${nationality} - ${category}`}

          </div>
        ) : (
          <div
            className="fav_card_category"
            data-testid={ `${i}-horizontal-top-text` }
          >
            {alcoholicOrNot}

          </div>
        )}
        <Link to={ `/${type}s/${id}` } style={ { textDecoration: 'none' } }>
          <div
            className="fav_card_title"
            data-testid={ `${i}-horizontal-name` }
          >
            {name}

          </div>
        </Link>
      </div>
      <div className="details_icons_container">
        <button
          className="details_btn"
          type="button"
          onClick={ shareRecipe }
          id={ id }
        >
          { copied
            ? (
              'Link copied!'
            )
            : (
              <FiShare2
                size={ 30 }
                className="details_icon"
              />
            )}
        </button>
        <button
          className="details_btn"
          type="button"
          id={ id }
          onClick={ removeFav }
        >
          <MdFavorite
            size={ 30 }
            className="details_icon_checked"
          />
          {/* <img
          src={ blackHeartIcon }
          data-testid={ `${i}-horizontal-favorite-btn` }
          alt="profile"
          id={ id }
        /> */}
        </button>
        {/* {copied && <span>Link copied!</span>} */}
      </div>
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
