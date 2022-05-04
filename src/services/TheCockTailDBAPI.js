const SURPRISEDRINK = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const LISTINGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

export const getDrinksCategory = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const searchDrink = async (url, typeSearch, search) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/${url}.php?${typeSearch}=${search}`,
  );
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const filterDrinkByCategory = async (category) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`,
  );
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const getSurpriseDrink = async () => {
  const response = await fetch(SURPRISEDRINK);
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const getIngredientsDrinks = async () => {
  const response = await fetch(LISTINGREDIENTS);
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};
