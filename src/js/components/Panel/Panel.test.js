import React from "react";
import { shallow } from "enzyme";

import Panel from "./Panel";
import { JestEnvironment } from "@jest/environment";

// import Context from "../../App";
// const { dispatch } = useContext(Context);

function setup(props = {}) {
  const defaultProps = {
    dots: 12
  };
  const context = {
    dispatch: jest.fn()
  };
  const wrapper = shallow(<Panel {...defaultProps} {...props} />, { context });
  return wrapper;
}

describe("Panel Test Suite!", () => {
  //let dispatch;
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
    console.log(wrapper.debug());
    //dispatch = jest.fn();
  });

  it("Should have an input of range type", () => {
    expect(wrapper.find("input[type='range']").exists()).toBe(true);
  });
  it("Should change a dots props", () => {
    wrapper.find("input").simulate("change", { target: { value: 25 } });
    expect(wrapper.instance().props.dots).toBe(25);
  });
});
