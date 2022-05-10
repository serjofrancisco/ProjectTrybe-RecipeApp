import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import MyContext from '../contexts/MyContext';
import Footer from '../components/Footer';
import CardFood from '../components/CardFood';

import { searchFood } from '../services/TheMealDBApi';
import CategoryBtns from '../components/CategoryBtns';

import '../styles/Foods.css';

function Foods() {
  const { data, setData } = useContext(MyContext);
  const doze = 12;

  const handleFood = async () => {
    if (!data.searchResult.length) {
      const { meals } = await searchFood('search', 's', '');
      setData({ searchResult: [...meals], typePage: 'foods' });
    }
  };

  useEffect(() => {
    handleFood();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header title="Foods" existeButton="true" />
      <CategoryBtns page="foods" />
      <div className="food_container">
        {
          data.searchResult.map((element, i) => (
            (i < doze) && (
              <CardFood
                element={ element }
                i={ i }
                key={ element.idMeal }
              />
            )
          ))
        }
      </div>
      <Footer existeFooter="true" />
    </div>
  );
}

export default Foods;
