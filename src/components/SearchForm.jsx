import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const testOne = (searchResult) => {
    if (searchResult.length === 1) {
      const id = (page === 'Foods') ? searchResult[0].idMeal
        : searchResult[0].idDrink;
      history.push(`/${page.toLowerCase()}/${id}`);
    }
  };

  const handleSearch = async () => {
    if (typeSearch === 'f' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (page === 'Foods') {
      const { meals } = await searchFood(url, typeSearch, search);
      if (meals) {
        testOne(meals);
        setData({ searchResult: meals, typePage: page.toLowerCase() });
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    } else if (page === 'Drinks') {
      const { drinks } = await searchDrink(url, typeSearch, search);
      if (drinks) {
        testOne(drinks);
        setData({ searchResult: drinks, typePage: page.toLowerCase() });
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
  };

  const style = {
    position: 'fixed',
    top: '85px',
    background: 'gray',
    left: '0',
    width: '100%',
  };

  return (
    <div style={ style }>
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
