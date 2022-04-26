import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
// import { useHistory } from "react-router";
import PropTypes from 'prop-types';
// import { getCategory,
//   getNationality, getIngredients, getRecipes } from '../services/TheMealDBApi';

export default function Login(props) {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cantSubmit, setCantSubmit] = useState(true);

  useEffect(() => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const testuserEmail = regex.test(userEmail);
    const min = 6;
    if (testuserEmail && password.length > min) setCantSubmit(false);
    else setCantSubmit(true);
  }, [userEmail, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { history } = props;
    const obj = { email: userEmail };
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify(obj));
    history.push('/foods');
    return true;
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="userEmail">
        <input
          type="email"
          id="userEmail"
          data-testid="email-input"
          value={ userEmail }
          onChange={ ({ target: { value } }) => setUserEmail(value) }
        />
      </label>
      <label htmlFor="pass">
        <input
          type="password"
          id="pass"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
      </label>
      <Button
        variant="success"
        type="submit"
        data-testid="login-submit-btn"
        disabled={ cantSubmit }
      >
        Enter
      </Button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
