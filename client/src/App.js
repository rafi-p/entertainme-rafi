import React from 'react'
import { Home, Movies, Series, MovieDetail, AddMovie, EditMovie, Favorite } from './pages/index'
import { Switch, Route, Link} from 'react-router-dom'
import './App.css';
import logo from './assets/logo2.png'

import { ApolloProvider } from "@apollo/client"
import client from './config/graphql'

function App() {
  return (
    <ApolloProvider client={client}>
      <nav>
        <Link className="logo" to="/">
            <img src={logo} alt=""/>
        </Link>
        <ul className="menu">
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/series">TV Shows</Link></li>
        </ul>
        <ul className="menu">
            <li><Link to='/addMovie'>Add</Link></li>
            <li><Link to='/favorite'>Favorite</Link></li>
        </ul>
      </nav>

      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route exact path='/movies'>
          <Movies/>
        </Route>
        <Route path='/detailMovie/:id'>
          <MovieDetail/>
        </Route>
        <Route path='/series'>
          <Series/>
        </Route>
        <Route path='/addMovie'>
          <AddMovie/>
        </Route>
        <Route path='/editMovie/:id'>
          <EditMovie/>
        </Route>
        <Route path='/favorite'>
          <Favorite/>
        </Route>
      </Switch>
    </ApolloProvider>
  );
}

export default App;
