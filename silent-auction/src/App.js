import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/SIgnup';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route exact path="/Signup" component={Signup} />
      {/* <ProtectedRoute exact path="/Home" component={} /> */}
    </div>
  );
}

export default App;
