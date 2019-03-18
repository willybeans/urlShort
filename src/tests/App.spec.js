import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import '../../testSetup'

import {configure, shallow, mount, render} from 'enzyme'
import { expect } from 'chai'
import App from '../App'

configure({ adapter: new Adapter() });

const wrapper = shallow(<App />)
describe('App Component', () => {
  it('should have a class named MainApp', function() {
    const wrapper = shallow(<App />)
    expect(wrapper.is('.MainApp')).to.equal(true);
  })
  // it('renders h1', () => {
  //   expect(wrapper.find('h1').text()).to.equal('Hello World')
  // })
  // it('renders p', () => {
  //   expect(wrapper.find('p').text()).to.equal('Welcome to my world')
  // })
})
