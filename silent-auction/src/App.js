import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Components/Home';
import Auction from './Components/Auction';
import AddAuction from './Components/AddAuction';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route exact path="/Signup" component={Signup} />
      <ProtectedRoute exact path="/Home" component={Home} />
      <ProtectedRoute exact path="/auctions/:id" component={Auction} />
      <ProtectedRoute exact path="/addAuction" component={AddAuction} />
    </div>
  );
}

export default App;
