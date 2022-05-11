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
    <div className="profile_done_favs_main_container">
      <Header title="Profile" />
      <main>
        <section className="profile_btns_container">
          <p
            className="profile_email"
            data-testid="profile-email"
          >
            {
              email
            }

          </p>
          <Link to="/done-recipes">
            <button
              className="profile_btns"
              data-testid="profile-done-btn"
              type="button"
            >
              Done Recipes
            </button>
          </Link>
          <Link to="/favorite-recipes">
            <button
              className="profile_btns"
              data-testid="profile-favorite-btn"
              type="button"
            >
              Favorite Recipes
            </button>
          </Link>
          <button
            className="profile_btns profile_btn_logout"
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
