import React from 'react';
import {render} from 'react-dom';
import {Meteor} from 'meteor/meteor';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import {hammerIt} from './lib/hammerIt.js';

// main app
import InterIndex from './components/inter_index.js';
import InterAbout from './components/inter_about.js';
import { Provider } from 'react-redux';
import store from './store.js';


Meteor.startup(() => {

window.onload = function(e){
  hammerIt(document.getElementById("render-target"))
}

render(
   <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={InterIndex}/>
        <Route path='/dogodki/:id' component={InterAbout}/>
      </Switch>
    </BrowserRouter>
   </Provider>
     ,document.getElementById('render-target'));
});
