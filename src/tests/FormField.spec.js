import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import '../../testSetup'

import {configure, shallow, mount, render} from 'enzyme'
import { expect } from 'chai'
import FormField from '../components/FormField'

configure({ adapter: new Adapter() });

const props = {
  handleChange: function(e){
    this.setState({url: e.target.value});
  },
  handleSubmit: function(){

  }
}

const wrapper = shallow(<FormField props={props} />)
describe('Form Field Component', () => {
  const wrapper = shallow(<FormField />)

  it('The Wrapper has a class .FormFieldWrapper', function() {
    expect(wrapper.is('.FormFieldWrapper')).to.equal(true);
  })
  it('Wrapper should contain a form', function() {
    expect(wrapper.exists('form')).to.equal(true);
  })
  it('Form component should have 3 children', function() {
    expect(wrapper.find('form').children()).to.have.lengthOf(3);
  })
  it('Form should have a label', function() {
    expect(wrapper.find('form').children().exists('label')).to.equal(true);
  })
  it('Label text should be \'Insert Your Url:\'', function() {
    expect(wrapper.find('form').children().find('label').text()).to.equal('Insert Your Url:');
  })
  it('Form should have 2 inputs', function() {
    expect(wrapper.find('form').children().find('input')).to.have.lengthOf(2);
  })
  it('Form button should have a class .btn', function() {
    expect(wrapper.find('form').children().find('input').exists('.btn')).to.equal(true);
  })

})
