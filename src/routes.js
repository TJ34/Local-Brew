import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './views/Home/Home';
import Breweries from './views/Breweries/Breweries';
import Beers from './views/Beers/Beers';

export default (
    <Switch>
        <Route exact path ='/' component = {Home}/>
        <Route path = '/breweries' component = {Breweries}/>
        <Route path = '/beers' component = {Beers}/>
    </Switch>
)