import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
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

  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = { email: userEmail };
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify(obj));
    history.push('/foods');
    return true;
  };

  return (
    <form
      className="login_container"
      onSubmit={ handleSubmit }
    >
      <section
        className="login_container_titles"
      >
        <h1>Recipes App</h1>
        <h3>Login</h3>
      </section>
      <section className="login_container_inputs">
        <label htmlFor="userEmail">
          <input
            className="login_input"
            placeholder="Digite um Email válido"
            type="email"
            id="userEmail"
            data-testid="email-input"
            value={ userEmail }
            onChange={ ({ target: { value } }) => setUserEmail(value) }
          />
        </label>
        <label htmlFor="pass">
          <input
            className="login_input"
            placeholder="Digite uma senha com 7 ou mais caracteres"
            type="password"
            id="pass"
            data-testid="password-input"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
        </label>
      </section>
      <Button
        // variant="success"
        // size="lg"
        // active
        className="login_btn"
        type="submit"
        data-testid="login-submit-btn"
        disabled={ cantSubmit }
      >
        Enter
      </Button>

    </form>
  );
}
