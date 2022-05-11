import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Explore.css';

function Explore() {
  return (
    <div className="explore_container">
      <Header title="Explore" />
      <div className="explore_card_container">
        <Link to="/explore/foods" style={ { textDecoration: 'none' } }>
          <button
            className="explore_card"
            data-testid="explore-foods"
            type="button"
          >
            <img
              className="explore_card_img"
              src="https://images.unsplash.com/photo-1576402187878-974f70c890a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1033&q=80"
              alt="foods"
            />
            Explore Foods
          </button>
        </Link>
        <Link to="/explore/drinks" style={ { textDecoration: 'none' } }>
          <button
            className="explore_card"
            data-testid="explore-drinks"
            type="button"
          >
            <img
              className="explore_card_img"
              src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1257&q=80"
              alt="drinks"
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
