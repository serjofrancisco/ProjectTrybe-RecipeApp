import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title, existeButton }) {
  return (
    <div>
      <button type="button">
        <img
          src={ profileIcon }
          alt="profile"
          data-testid="profile-top-btn"
        />
      </button>
      <h1
        data-testid="page-title"
      >
        { title }
      </h1>
      {(existeButton) && (
        <button type="button">
          <img
            src={ searchIcon }
            alt="search"
            data-testid="search-top-btn"
          />
        </button>)}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;
