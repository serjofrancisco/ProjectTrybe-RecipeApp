import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };
  useEffect(() => {
    if (localStorage.getItem('user')) {
      setEmail(JSON.parse(localStorage.getItem('user')).email);
    }
  }, []);
  return (
    <div>
      <Header title="Profile" />
      <main>
        <p data-testid="profile-email">
          {
            email
          }

        </p>
        <section className="profile-btns-container">
          <Link to="/done-recipes">
            <button data-testid="profile-done-btn" type="button">
              Done Recipes
            </button>
          </Link>
          <Link to="/favorite-recipes">
            <button data-testid="profile-favorite-btn" type="button">
              Favorite Recipes
            </button>
          </Link>
          <button
            data-testid="profile-logout-btn"
            onClick={ handleLogout }
            type="button"
          >
            Logout
          </button>
        </section>
      </main>
      <Footer existeFooter="true" />
    </div>
  );
}

export default Profile;
