import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route exact path="/Signup" component={Signup} />
      <ProtectedRoute exact path="/Home" component={Home} />
    </div>
  );
}

export default App;
