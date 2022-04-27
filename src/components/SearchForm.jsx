import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { searchFood } from '../services/TheMealDBApi';
import { searchDrink } from '../services/TheCockTailDBAPI';

export default function SearchForm({ page }) {
  const [search, setSearch] = useState('');
  const [typeSearch, setTypeSearch] = useState('');

  const handleTypeSearch = ({ target: { value } }) => setTypeSearch(value);

  const handleSearch = () => {
    let result = [];
    if (typeSearch === 'first-letter' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (page === 'Foods') {
      result = searchFood(typeSearch, search);
    } else if (page === 'Drinks') {
      result = searchDrink(typeSearch, search);
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
      <span>Busca por...</span>
      <label htmlFor="ingredients">
        Ingrediente:
        <input
          type="radio"
          onClick={ handleTypeSearch }
          id="ingredients"
          data-testid="ingredient-search-radio"
          name="search"
          value="i"
        />
      </label>
      <label htmlFor="name">
        Nome:
        <input
          type="radio"
          id="name"
          data-testid="name-search-radio"
          name="search"
          value="s"
          onClick={ handleTypeSearch }
        />
      </label>
      <label htmlFor="first-letter">
        Primeira Letra:
        <input
          type="radio"
          id="first-letter"
          data-testid="first-letter-search-radio"
          name="search"
          value="f"
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

SearchForm.propTypes = {
  page: PropTypes.string,
}.isRequired;
