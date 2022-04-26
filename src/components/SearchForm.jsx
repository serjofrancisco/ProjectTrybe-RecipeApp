import React, { useState } from 'react';
import {
  searchByIngredient,
  searchByName,
  searchByFirstLetter } from '../services/TheMealDBApi';

export default function SearchForm() {
  const [search, setSearch] = useState('');
  const [typeSearch, setTypeSearch] = useState('');

  const handleTypeSearch = ({ target: { value } }) => setTypeSearch(value);

  const handleSearch = () => {
    let result = [];
    switch (typeSearch) {
    case 'ingredient':
      result = searchByIngredient(search);
      break;
    case 'name':
      result = searchByName(search);
      break;
    case 'first-letter':
      result = searchByFirstLetter(search);
      break;
    default:
      result = [];
    }
    return result;
  };

  return (
    <div>
      <label htmlFor="search">
        <input
          type="text"
          id="search"
          data-testid="search-input"
          value={ search }
          onChange={ ({ target: { value } }) => setSearch(value) }
        />
      </label>
      <label htmlFor="ingredients">
        <input
          type="radio"
          onClick={ handleTypeSearch }
          id="ingredients"
          data-testid="ingredient-search-radio"
          name="search"
          value="ingredient"
        />
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          id="name"
          data-testid="name-search-radio"
          name="search"
          value="name"
          onClick={ handleTypeSearch }
        />
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          id="first-letter"
          data-testid="first-letter-search-radio"
          name="search"
          value="first-letter"
          onClick={ handleTypeSearch }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Buscar
      </button>
    </div>
  );
}
