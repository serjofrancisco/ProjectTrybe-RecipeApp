import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../contexts/MyContext';
import { getFoodCategory,
  filterFoodByCategory,
  searchFood } from '../services/TheMealDBApi';
import { getDrinksCategory,
  filterDrinkByCategory,
  searchDrink } from '../services/TheCockTailDBAPI';

export default function CategoryBtns({ page }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { setData } = useContext(MyContext);
  const getCategories = async () => {
    if (page === 'foods') {
      const { meals } = await getFoodCategory();
      setCategories(meals);
    } else if (page === 'drinks') {
      const { drinks } = await getDrinksCategory();
      setCategories(drinks);
    }
  };
  const filterCategory = async (value) => {
    setSelectedCategory(value);
    if (page === 'foods') {
      const { meals } = await filterFoodByCategory(value);
      setData({ typePage: page, searchResult: meals });
    } else if (page === 'drinks') {
      const { drinks } = await filterDrinkByCategory(value);
      setData({ typePage: page, searchResult: drinks });
    }
  };

  const handleClickAll = async () => {
    if (page === 'foods') {
      const { meals } = await searchFood('search', 's', '');
      setData({ searchResult: [...meals], typePage: 'foods' });
    } else if (page === 'drinks') {
      const { drinks } = await searchDrink('search', 's', '');
      setData({ searchResult: [...drinks], typePage: 'drinks' });
    }
  };

  const handleClick = async ({ target: { value } }) => {
    if (selectedCategory !== value) {
      filterCategory(value);
    } else {
      handleClickAll();
    }
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cinco = 5;
  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleClickAll }
      >
        All
      </button>
      {categories.map((element, i) => (
        (i < cinco) && (
          <button
            type="button"
            key={ element.strCategory }
            data-testid={ `${element.strCategory}-category-filter` }
            value={ element.strCategory }
            onClick={ handleClick }
          >
            { element.strCategory }
          </button>
        )))}
    </div>
  );
}

CategoryBtns.propTypes = {
  page: PropTypes.string,
}.isRequired;
