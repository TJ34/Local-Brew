import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './views/Home/Home';
import Breweries from './views/Breweries/Breweries';
import Beers from './views/Beers/Beers';
import Brewery from './views/Brewery/Brewery';

export default (
    <Switch>
        <Route exact path ='/' component = {Home}/>
        <Route path='/breweries/brewery' component={Brewery}/>
        <Route path = '/breweries' component = {Breweries}/>
        <Route path = '/beers' component = {Beers}/>
    </Switch>
)