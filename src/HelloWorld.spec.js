import React from 'react'
import expect from 'expect'
import * as enzyme from 'enzyme'
// import { shallow, mount } from 'enzyme'
import HelloWorld from './HelloWorld'
import Adapter from 'enzyme-adapter-react-16'
import '../testSetup'

enzyme.configure({ adapter: new Adapter() });

const wrapper = enzyme.shallow(<HelloWorld />)
describe('HelloWorld Component', () => {
  it('renders h1', () => {
    expect(wrapper.find('h1').text()).toEqual('Hello World')
  })
  it('renders p', () => {
    expect(wrapper.find('p').text()).toEqual('Welcome to my world')
  })
})
