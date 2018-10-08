import React, { Component } from 'react';
import './App.scss';
import {BrowserRouter} from 'react-router-dom';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        {routes}
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
