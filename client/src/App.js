import './App.css';
import React from 'react'
import {Route} from 'react-router-dom'
import {Home} from './components/Home/Home'
import NavBar from './components/NavBar/NavBar'
import LandingPage from './components/LandingPage/LandingPage'
import { Switch } from 'react-router-dom';
import { Details } from './components/Details/Details';
import { AddActivity } from './components/AddActivities/AddActivities'

function App() {

  return (
    <div className="App">
      
      <Switch>
        <Route exact path={'/'} component={LandingPage}/>
        <Route path={'/'} component={NavBar}/>
      </Switch>

      <Route exact path={'/Home/:page'} component={Home}/>
      <Route exact path={`/Home/Details/:id`} component={Details}/>
      <Route exact path={`/Home/Workshop/createActivity`} component={AddActivity}/>
      
    </div>
  );
}

export default App;
