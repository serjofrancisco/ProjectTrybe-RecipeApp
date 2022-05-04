import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  // const history = useHistory();

  // const onClick = () => {
  //   history.push('/foods');
  // };
  return (
    <div>
      <Header title="Profile" />
      <main>
        <p data-testid="profile-email">email</p>
        <section className="profile-btns-container">
          <Link to="/done-recipes">
            <button data-testid="profile-done-btn" type="button">
              Done Recipes
            </button>
          </Link>
          <Link to="/done-recipes">
            <button data-testid="profile-favorite-btn" type="button">
              Favorite Recipes
            </button>
          </Link>
          <Link to="/done-recipes">
            <button data-testid="profile-logout-btn" type="button">
              Logout
            </button>
          </Link>
        </section>
      </main>
      <Footer existeFooter="true" />
    </div>
  );
}

export default Profile;
