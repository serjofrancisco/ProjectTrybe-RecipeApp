<<<<<<< HEAD
import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function Provider({ children }) {
  const [data, setData] = useState({
    searchResult: [],
    typePage: '',
  });
  const [receipe, setReceipe] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  // const history = useHistory();
  // const getDetails = () => {
  //   if (data.searchResult.length === 1) {
  //     const id = (data.typePage === 'foods') ? data.searchResult[0].idMeal
  //       : data.searchResult[0].idDrink;
  //     history.push(`/${data.typePage}/${id}`);
  //   }
  // };

  // useEffect(() => {
  //   if (data.searchResult) {
  //     getDetails();
  //   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data.searchResult]);

  return (
    <MyContext.Provider
      value={ {
        data,
        setData,
        receipe,
        setReceipe,
        recommendations,
        setRecommendations,
      } }
    >
      {children}
    </MyContext.Provider>

  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
=======
import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function Provider({ children }) {
  const [data, setData] = useState({
    searchResult: [],
    typePage: '',
  });

  // const history = useHistory();
  // const getDetails = () => {
  //   if (data.searchResult.length === 1) {
  //     const id = (data.typePage === 'foods') ? data.searchResult[0].idMeal
  //       : data.searchResult[0].idDrink;
  //     history.push(`/${data.typePage}/${id}`);
  //   }
  // };

  // useEffect(() => {
  //   if (data.searchResult) {
  //     getDetails();
  //   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data.searchResult]);

  return (
    <MyContext.Provider
      value={ {
        data,
        setData,
      } }
    >
      {children}
    </MyContext.Provider>

  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
>>>>>>> main-group-23
