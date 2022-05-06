import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import MyContext from '../contexts/MyContext';
import { getNationality,
  searchFood, getFilterNationalities } from '../services/TheMealDBApi';
import CardFood from '../components/CardFood';

function FoodsNationalities() {
  const [nationalities, setNationalities] = useState([]);
  const [filterNationalities, setFilterNationalities] = useState([]);
  // const { data } = useContext(MyContext);
  // console.log(data);

  const fetchNationalities = async () => {
    const { meals } = await getNationality();
    setNationalities(meals);
  };

  const handleFoodAll = async () => {
    const { meals } = await searchFood('search', 's', '');
    setFilterNationalities(meals);
  };

  const filterNationalitie = async (name) => {
    const { meals } = await getFilterNationalities(name);
    setFilterNationalities(meals);
  };

  const handleChangeSearch = ({ target }) => {
    const nationalitie = target.value;
    if (nationalitie === 'all') {
      return handleFoodAll();
    }
    return filterNationalitie(nationalitie);
    // console.log(nationalitie);
  };

  useEffect(() => {
    fetchNationalities();
    handleFoodAll();
  }, []);
  const doze = 12;
  return (
    <div>
      <Header title="Explore Nationalities" existeButton="true" />
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ handleChangeSearch }
      >
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
        filterNationalities.map((element, i) => (
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
