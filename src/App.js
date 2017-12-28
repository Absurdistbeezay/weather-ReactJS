import React, { Component } from 'react';
import Weather from './Weather/Weather';
import './App.css';
import Footer from './Footer/Footer';
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Current Weather</h1>
      <Weather/>
      <Footer/>
      </div>
    );
  }
}

export default App;
