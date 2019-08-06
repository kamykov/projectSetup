import React from "react";
import { shallow } from "enzyme";
import Loading from "./Loading";



describe('Loading testing', () => {
  it('should render', () => {
    let wrapper = shallow(<Loading />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('Renders spnner without errors ', () => {
    
    let wrapper = shallow(<Loading />);
    const spinner = wrapper.find(".spinner");

    expect(spinner.length).toBe(1)
    
  });
});