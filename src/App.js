import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import FoodsIngredients from './pages/FoodsIngredients';
import DrinksIngredients from './pages/DrinksIngredients';
import FoodsNationalities from './pages/FoodsNationalities';
import DoneRecipes from './pages/DoneRecipes';
import Favorites from './pages/Favorites';
import DetailsFoods from './pages/DetailsFoods';
import DetailsDrinks from './pages/DetailsDrinks';
import './App.css';
import './styles/Drinks_Foods.css';
import './styles/Explore.css';
import './styles/Details.css';
import './styles/Favorites.css';
import './styles/Ingredients.css';
import './styles/Nationality.css';
import './styles/Explore_Drinks_Foods.css';
import './styles/InProgress.css';
import './styles/Profile_Done_Favs.css';
import './styles/Search.css';
import NotFound from './pages/NotFound';
import InProgressFood from './pages/InProgressFood';
import InProgressDrinks from './pages/InProgressDrinks';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/foods/:id" component={ DetailsFoods } />
      <Route exact path="/drinks/:id" component={ DetailsDrinks } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route exact path="/explore/foods/ingredients" component={ FoodsIngredients } />
      <Route exact path="/explore/drinks/ingredients" component={ DrinksIngredients } />
      <Route exact path="/explore/foods/nationalities" component={ FoodsNationalities } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/foods/:id/in-progress" component={ InProgressFood } />
      <Route exact path="/drinks/:id/in-progress" component={ InProgressDrinks } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ Favorites } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}
// commit
export default App;
