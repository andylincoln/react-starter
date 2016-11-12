import React from 'react';
import chai, {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import App from '../src/components/app';

describe('App should exist', function () {
  it('renders without problems', function () {
    var app = TestUtils.renderIntoDocument(<App/>);
    expect(app).to.exist;
  });
});
