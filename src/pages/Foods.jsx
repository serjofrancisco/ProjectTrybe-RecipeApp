import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import MyContext from '../contexts/MyContext';
import Footer from '../components/Footer';
import CardFood from '../components/CardFood';
import { searchFood } from '../services/TheMealDBApi';
import CategoryBtns from '../components/CategoryBtns';

function Foods() {
  const { data, setData } = useContext(MyContext);
  const doze = 12;

  const handleFood = async () => {
    const { meals } = await searchFood('search', 's', '');
    setData({ searchResult: [...meals], typePage: 'foods' });
  };

  useEffect(() => {
    handleFood();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header title="Foods" existeButton="true" />
      <CategoryBtns page="foods" />
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

export default Foods;
