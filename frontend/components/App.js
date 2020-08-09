import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home/Home';
import Recipes from './Recipes';
import About from './About';
import Search from './Search';
import Footer from './Footer';
import Recipe from './Recipe/Recipe';

function App() {
  return (
    <div>
      <Navbar />
      <Switcheroo />
      <Footer />
    </div>
  );
}

function Switcheroo() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/recipes' component={Recipes} />
      <Route path='/about' component={About} />
      <Route path='/search' component={Search} />
      <Route path='/recipe/:name' component={Recipe} />
    </Switch>
  );
}

export default App;
