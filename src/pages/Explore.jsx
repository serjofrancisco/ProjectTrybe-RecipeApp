import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Explore.css';

function Explore() {
  return (
    <div>
      <Header title="Explore" />
      <div className="explore_container">
        <Link to="/explore/foods">
          <button
            className="explore_card_container"
            data-testid="explore-foods"
            type="button"
          >
            <img
              src="https://via.placeholder.com/150"
              alt="search"
            />
            Explore Foods
          </button>
        </Link>
        <Link to="/explore/drinks" className="explore_card_container">
          <button
            className="explore_card_container"
            data-testid="explore-drinks"
            type="button"
          >
            <img
              src="https://via.placeholder.com/150"
              alt="search"
            />
            Explore Drinks
          </button>
        </Link>
      </div>
      <Footer existeFooter="true" />
    </div>
  );
}

export default Explore;
