import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function Provider({ children }) {
  const [data, setData] = useState({
    searchResult: [],
    typePage: '',
  });

  const history = useHistory();
  const teste = () => {
    if (data.searchResult.length === 1) {
      const id = (data.typePage === 'foods') ? data.searchResult[0].idMeal
        : data.searchResult[0].idDrink;
      history.push(`/${data.typePage}/${id}`);
    } else {
      // fazer lista em cima de data.typePage
    }
  };

  useEffect(() => {
    if (data.searchResult) {
      teste();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.searchResult]);

  return (
    <MyContext.Provider
      value={ {
        data,
        setData,
        teste,
      } }
    >
      {children}
    </MyContext.Provider>

  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
