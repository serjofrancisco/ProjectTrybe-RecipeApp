import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

export default function Footer({ existeFooter }) {
  return (
    <div>
      { existeFooter && (
        <footer className="footer" data-testid="footer">
          <Link to="/drinks">
            <button type="button">
              <img
                src={ drinkIcon }
                alt="Redireciona para página de bebidas"
                data-testid="drinks-bottom-btn"
              />
            </button>
          </Link>
          <Link to="/explore">
            <button type="button">
              <img
                src={ exploreIcon }
                alt="Redireciona para página de explorar"
                data-testid="explore-bottom-btn"
              />
            </button>
          </Link>
          <Link to="/foods">
            <button type="button">
              <img
                src={ mealIcon }
                alt="Redireciona para página de comidas"
                data-testid="food-bottom-btn"
              />
            </button>
          </Link>
        </footer>
      )}
    </div>
  );
}

Footer.propTypes = {
  existeFooter: PropTypes.bool,
}.isRequired;
