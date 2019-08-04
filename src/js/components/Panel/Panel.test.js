import React from "react";
import { shallow } from "enzyme";

import Panel from "./Panel";

// import Context from "../../App";
// const { dispatch } = useContext(Context);

function setup(props = { dots: 12 }) {
  const defaultProps = {
    min: 1,
    max: 30,
    onchange: jest.fn()
  };
  const context = {
    dispatch: jest.fn()
  };
  const wrapper = shallow(<Panel {...defaultProps} {...props} />, { context });
  //const wrapper = (<Panel {...defaultProps} {...props} />, { context });
  return wrapper;
}

describe("Panel Basic render", () => {
  let component;
  test("should render", () => {
    component = render(<Panel />);
  });
});

describe("Panel Testing", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
    console.log(wrapper.debug());
  });

  it("Should have dots property", () => {
    
    expect(wrapper.props().dots).toBe(12);
  });

  it("should call props.onChange on change", () => {
    const onChange = jest.fn();
    wrapper = shallow(<Panel onChange={onChange} />);
    wrapper.find("input[type='range']").simulate("change", 25);

    expect(onChange).toHaveBeenCalledWith(25);
  });

  it("Should have an input of range type", () => {
    expect(wrapper.find("input[type='range']").exists()).toBe(true);
  });

  it("Should change a dots props", () => {
    wrapper
      .find("input[type='range']")
      .simulate("change", { target: { value: 25 } });
    expect(wrapper.props().dots).toBe(25);
  });
});
