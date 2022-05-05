export const toggleFood = (id, receipe, favorite) => {
  const favRecipes = localStorage.getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
  if (favorite) {
    const newFavs = favRecipes.filter((fav) => fav.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
  } else {
    const newFavs = [...favRecipes, {
      id,
      type: 'food',
      nationality: receipe.strArea ? receipe.strArea : '',
      category: receipe.strCategory ? receipe.strCategory : '',
      alcoholicOrNot: receipe.strAlcoholic ? receipe.strAlcoholic : '',
      name: receipe.strMeal,
      image: receipe.strMealThumb,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
  }
};

export const toggleDrink = (id, receipe, favorite) => {
  const favRecipes = localStorage.getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
  if (favorite) {
    const newFavs = favRecipes.filter((fav) => fav.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
  } else {
    const newFavs = [...favRecipes, {
      id,
      type: 'drink',
      nationality: receipe.strArea ? receipe.strArea : '',
      category: receipe.strCategory ? receipe.strCategory : '',
      alcoholicOrNot: receipe.strAlcoholic ? receipe.strAlcoholic : '',
      name: receipe.strDrink,
      image: receipe.strDrinkThumb,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
  }
};
