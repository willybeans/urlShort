import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import '../../testSetup'

import {configure, shallow, mount, render} from 'enzyme'
import { expect } from 'chai'
import HelloWorld from '../HelloWorld'

configure({ adapter: new Adapter() });

const wrapper = shallow(<HelloWorld />)
describe('HelloWorld Component', () => {
  it('should have a class named HelloWorld', function() {
    const wrapper = shallow(<HelloWorld />)
    expect(wrapper.is('.hello-world')).to.equal(true);
  })
  it('renders h1', () => {
    expect(wrapper.find('h1').text()).to.equal('Hello World')
  })
  it('renders p', () => {
    expect(wrapper.find('p').text()).to.equal('Welcome to my world')
  })
})
