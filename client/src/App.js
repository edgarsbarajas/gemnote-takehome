import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/common/Header';
import CustomerList from './components/CustomerList';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <div className="content">
              <Route exact path="/customers" component={CustomerList} />
            </div>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
