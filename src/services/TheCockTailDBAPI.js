export const getCategory = async () => {
  const response = await fetch(CATEGORIAS_BASE_API);
  const json = await response.json();
  console.log(json);
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const searchDrink = async (typeSearch, search) => {
  const response = await fetch(
    `www.thecocktaildb.com/api/json/v1/1/filter.php?${typeSearch}=${search}`,
  );
  const json = await response.json();
  console.log(json);
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};
