import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';
import Preferences from '../Preferences/Preferences';
import Login from '../Login/Login';
//import { handleErrors, loginUser, createUser } from '../Login/LoginHelper';
import useUser from './useUser';

import './App.css';

export default function App() {
  const { userId, setUserId } = useUser();
  
  if (!userId) {
    return <Login setToken={setUserId} />
  }
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/testv1/dashboard">
            <Dashboard />
          </Route>
          <Route path="/testv1/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
