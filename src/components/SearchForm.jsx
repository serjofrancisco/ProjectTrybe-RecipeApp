import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../contexts/MyContext';
import { searchFood } from '../services/TheMealDBApi';
import { searchDrink } from '../services/TheCockTailDBAPI';

export default function SearchForm({ page }) {
  const [search, setSearch] = useState('');
  const [typeSearch, setTypeSearch] = useState('');
  const [url, setUrl] = useState('');

  const { setData } = useContext(MyContext);

  const handleTypeSearch = ({ target: { value, className } }) => {
    setTypeSearch(value);
    setUrl(className);
  };

  const handleSearch = async () => {
    let searchResult = {};
    if (typeSearch === 'f' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (page === 'Foods') {
      searchResult = await searchFood(url, typeSearch, search);
      setData({ searchResult: searchResult.meals, typePage: page.toLowerCase() });
    } else if (page === 'Drinks') {
      searchResult = await searchDrink(url, typeSearch, search);
      setData({ searchResult: searchResult.drinks, typePage: page.toLowerCase() });
    }
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
          className="filter"
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
          className="search"
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
          className="search"
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
