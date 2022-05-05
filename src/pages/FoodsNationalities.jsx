import React, { useState, useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../contexts/MyContext';
import { getNationality, searchFood } from '../services/TheMealDBApi';
import CardFood from '../components/CardFood';

function FoodsNationalities() {
  const [nationalities, setNationalities] = useState([]);
  // const [filterNationalities, setFilterNationalities] = useState('All');
  const { data, setData } = useContext(MyContext);
  console.log(data);

  const fetchNationalities = async () => {
    const { meals } = await getNationality();
    setNationalities(meals);
  };

  const handleFood = async () => {
    if (!data.searchResult.length) {
      const { meals } = await searchFood('search', 's', '');
      setData({ searchResult: [...meals], typePage: 'foods' });
    }
  };

  useEffect(() => {
    fetchNationalities();
    handleFood();
  }, []);
  const doze = 12;
  return (
    <div>
      <Header title="Explore Nationalities" existeButton="true" />
      <select data-testid="explore-by-nationality-dropdown">
        <option
          value="all"
          data-testid="All-option"
        >
          All
        </option>
        { nationalities.map((nationalite) => (
          <option
            value={ nationalite.strArea }
            key={ nationalite.strArea }
            data-testid={ `${nationalite.strArea}-option` }
          >
            { nationalite.strArea }
          </option>
        ))}
      </select>
      {
        data.searchResult.map((element, i) => (
          (i < doze) && (
            <CardFood element={ element } i={ i } key={ element.idMeal } />
          )
        ))
      }
      <Footer existeFooter="true" />
    </div>
  );
}

export default FoodsNationalities;
