import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import '../../testSetup'

import {configure, shallow, mount, render} from 'enzyme'
import { expect } from 'chai'
import ShortenedOutput from '../components/ShortenedOutput'

configure({ adapter: new Adapter() });

const wrapper = shallow(<ShortenedOutput />)
describe('Shortened Output Component', () => {
  it('should have a class named ShortenedOutput', function() {
    const wrapper = shallow(<ShortenedOutput />)
    expect(wrapper.is('.ShortenedOutput')).to.equal(true);
  })
  // it('renders h1', () => {
  //   expect(wrapper.find('h1').text()).to.equal('Hello World')
  // })
  // it('renders p', () => {
  //   expect(wrapper.find('p').text()).to.equal('Welcome to my world')
  // })
})
