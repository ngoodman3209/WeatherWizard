import React from 'react';
import './App.css';
import Weather from './Weather';

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Weather />
      </div>
    );
  }
}

export default App;
