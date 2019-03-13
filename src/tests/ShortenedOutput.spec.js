import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import '../../testSetup'

import {configure, shallow, mount, render} from 'enzyme'
import { expect } from 'chai'
import ShortenedOutput from '../components/ShortenedOutput'

configure({ adapter: new Adapter() });

const props = {
  shortUrl: 'example.url',
  handleClickCopy: function() {
    this.setState({copied: true});
    setTimeout( () => {
      this.setState({copied: false});
    }, 5000);
  },
  copied: false
}

const wrapper = shallow(<ShortenedOutput props={props} />)
describe('Shortened Output Component', () => {
  const wrapper = shallow(<ShortenedOutput />)

  it('Component Wrapper should have a class .ShortenedOutput', function() {
    expect(wrapper.is('.ShortenedOutput')).to.equal(true);
  })
  it('Wrapper should contain 2 children', function(){
    expect(wrapper.children()).to.have.lengthOf(2);
  })
  it('Component should have a button ', () => {
    expect(wrapper.exists('button')).to.equal(true);
  })


})
