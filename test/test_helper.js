// test_helper.js

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import chai, { expect } from 'chai';
import reducers from '../src/reducers';


//  Given a React Component, and optionally its props and the application state, render a component to the DOM
function renderComponent(ComponentClass, props={}, state={}) {
  let renderedComponent = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );
  return renderedComponent;
}

export {renderComponent};
