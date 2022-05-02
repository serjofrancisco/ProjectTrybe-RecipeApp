import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../contexts/MyContext';
import CardDrink from '../components/CardDrink';
import { searchDrink } from '../services/TheCockTailDBAPI';
import CategoryBtns from '../components/CategoryBtns';

function Drinks() {
  const { data, setData } = useContext(MyContext);
  const doze = 12;

  const handleDrink = async () => {
    const { drinks } = await searchDrink('search', 's', '');
    setData({ searchResult: [...drinks], typePage: 'drinks' });
  };

  useEffect(() => {
    handleDrink();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header title="Drinks" existeButton="true" />
      <CategoryBtns page="drinks" />
      {
        data.searchResult.map((element, i) => (
          (i < doze) && (
            <CardDrink element={ element } i={ i } key={ element.idDrink } />
          )
        ))
      }
      <Footer existeFooter="true" />
    </div>
  );
}

export default Drinks;
