import React, { useContext } from 'react';
import Header from '../components/Header';
import MyContext from '../contexts/MyContext';

function Foods() {
  const { data } = useContext(MyContext);
  const doze = 12;
  return (
    <div>
      <Header title="Foods" existeButton="true" />
      {(!data.searchResult)
        ? global.alert('Sorry, we haven\'t found any recipes for these filters.') : (
          data.searchResult.map((element, i) => (
            (i < doze) && (
              <div key={ element.idMeal } data-testid={ `${i}-recipe-card` }>
                <img
                  src={ element.strMealThumb }
                  alt="search"
                  data-testid={ `${i}-card-img` }
                />
                <p data-testid={ `${i}-card-name` }>{element.strMeal}</p>
              </div>
            )
          )))}
    </div>
  );
}

export default Foods;
