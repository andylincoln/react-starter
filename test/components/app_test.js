import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import chai, { expect } from 'chai';

import App from '../../src/components/app';
import reducers from '../../src/reducers';
import {renderComponent} from '../test_helper';

describe('App' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(App);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });
});
