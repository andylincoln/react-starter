import React, { Component } from 'react';

export default class Nav extends Component {
  render() {
    return (
      <nav role="navigation">
        <ul className="nav">
          <li><a href="#">link</a></li>
          <li><a href="#">link</a></li>
          <li><a href="#">link</a></li>
          <li><a href="#">link</a></li>
        </ul>
      </nav>
    );
  }
}
