
import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../contexts/MyContext';
function Drinks() {
  const { data } = useContext(MyContext);
  const doze = 12;
  return (
    <div>
      <Header title="Drinks" existeButton="true" />

      {(!data.searchResult)
        ? global.alert('Sorry, we haven\'t found any recipes for these filters.') : (
          data.searchResult.map((element, i) => (
            (i < doze) && (
              <div key={ element.idDrink } data-testid={ `${i}-recipe-card` }>
                <img
                  src={ element.strDrinkThumb }
                  alt="search"
                  data-testid={ `${i}-card-img` }
                />
                <p data-testid={ `${i}-card-name` }>{element.strDrink}</p>
              </div>)
          )))}
      <Footer existeFooter="true" />
    </div>
  );
}

export default Drinks;
