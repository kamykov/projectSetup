import React, { useState, useEffect, useContext } from "react";
import {shallow, mount} from "enzyme";
import WingNav from "./WingNav"

describe('WingNav testing', () => {


  let wrapper;

  beforeEach(() => {
    const setRouteLeaveHook = jest.fn();
    wrapper = shallow(<WingNav params={{router: setRouteLeaveHook }} />)
    console.dir(wrapper.debug())
  });

  it('should render 2 buttons', () => {

    let buttons = wrapper.find('button');
    expect(buttons.length).toBe(2);
    expect(wrapper).toMatchSnapshot();

  });

  
});


