import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { NavbarComponent } from './components';
import { Home, Success } from './pages';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/success" component={Success} exact/>
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}
