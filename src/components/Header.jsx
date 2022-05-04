import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchForm from './SearchForm';
// import Profile from '../pages/Profile';

export default function Header({ title, existeButton }) {
  const [search, setSearch] = useState(false);

  return (
    <header className="header">
      <Link to="/profile">
        <button
          type="button"
        >
          <img
            src={ profileIcon }
            alt="profile"
            data-testid="profile-top-btn"
          />
        </button>
      </Link>
      <h1
        data-testid="page-title"
      >
        { title }
      </h1>
      {(existeButton) && (
        <button
          type="button"
          onClick={ () => setSearch((prevState) => !prevState) }
        >
          <img
            src={ searchIcon }
            alt="search"
            data-testid="search-top-btn"
          />
        </button>)}
      {(search) && (
        <SearchForm page={ title } />
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;
