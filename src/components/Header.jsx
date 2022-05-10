import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { CgSearchLoading } from 'react-icons/cg';
// import profileIcon from '../images/profileIcon.svg';
// import searchIcon from '../images/searchIcon.svg';
import SearchForm from './SearchForm';
import '../styles/Header.css';
// import Profile from '../pages/Profile';

export default function Header({ title, existeButton }) {
  const [search, setSearch] = useState(false);

  return (
    <header className="header">

      <Link to="/profile">
        <button
          className="header_btn"
          type="button"
        >
          <FaUserCircle
            size={ 40 }
            // data-testid="profile-top-btn"
            className="header_btn"
          />
          {/* <img
            src={ profileIcon }
            alt="profile"
            data-testid="profile-top-btn"
            className="header_btn
          /> */}
        </button>
      </Link>
      <h1
        data-testid="page-title"
      >
        { title }
      </h1>
      {(existeButton) && (
        <button
          className="header_btn"
          type="button"
          onClick={ () => setSearch((prevState) => !prevState) }
        >
          <CgSearchLoading
            size={ 40 }
            // data-testid="profile-top-btn"
            className="header_btn"
          />
          {/* <img
            src={ searchIcon }
            alt="search"
            data-testid="search-top-btn"
            className="header_btn"
          /> */}
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
