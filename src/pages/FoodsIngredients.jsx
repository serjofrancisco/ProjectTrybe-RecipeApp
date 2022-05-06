import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../contexts/MyContext';
import { getIngredients, getFilterIngredients } from '../services/TheMealDBApi';

function FoodsIngredients() {
  const [ingredients12, setIngredients12] = useState([]);
  const { setData } = useContext(MyContext);

  const doze = 12;
  const fetchIngredients = async () => {
    const { meals } = await getIngredients();
    const ingredientOnly = meals.map((ingredient) => ingredient.strIngredient);
    setIngredients12(ingredientOnly.filter((element, index) => index < doze));
  };

  const imgIngredients = (name) => {
    const url = `https://www.themealdb.com/images/ingredients/${name}-Small.png`;
    return url;
  };

  const history = useHistory();
  const filterIngredients = async (name) => {
    const { meals } = (await getFilterIngredients(name));
    console.log(meals);
    setData({ searchResult: [...meals], typePage: 'foods' });
    history.push('/foods');
  };

  useEffect(() => {
    fetchIngredients();
    imgIngredients();
  }, []);

  return (
    <div>
      <Header title="Explore Ingredients" />
      { ingredients12.length > 0 && (
        ingredients12.map((ingredient, index) => (
          <button
            data-testid={ `${index}-ingredient-card` }
            key={ index }
            type="button"
            onClick={ () => filterIngredients(ingredient) }
          >
            <img
              src={ imgIngredients(ingredient) }
              alt={ ingredient }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ ingredient }</p>
          </button>
        ))
      )}
      <Footer existeFooter="true" />
    </div>
  );
}

export default FoodsIngredients;
