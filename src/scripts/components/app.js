import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
        <div>
          <h1 className="app-name">react-starter</h1>
          <p>{process.env.NODE_ENV}</p>
        </div>
    );
  }
}