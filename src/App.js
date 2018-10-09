import React, { Component } from 'react';
import './App.scss';
import {BrowserRouter} from 'react-router-dom';
import routes from './routes';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBeer } from '@fortawesome/free-solid-svg-icons';
import {Provider} from 'react-redux';
import store from './ducks/store';

library.add(faBeer)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
      <div>
        {routes}
      </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
