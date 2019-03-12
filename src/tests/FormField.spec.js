import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import '../../testSetup'

import {configure, shallow, mount, render} from 'enzyme'
import { expect } from 'chai'
import FormField from '../components/FormField'

configure({ adapter: new Adapter() });

const wrapper = shallow(<FormField />)
describe('Form Field Component', () => {
  it('should have a class named FormField', function() {
    const wrapper = shallow(<FormField />)
    expect(wrapper.is('.FormField')).to.equal(true);
  })
  // it('renders h1', () => {
  //   expect(wrapper.find('h1').text()).to.equal('Hello World')
  // })
  // it('renders p', () => {
  //   expect(wrapper.find('p').text()).to.equal('Welcome to my world')
  // })
})
