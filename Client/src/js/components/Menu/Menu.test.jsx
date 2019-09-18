import React from "react";
import { mount, shallow } from "enzyme";
import Menu from "./Menu.jsx";
import { mountWithIntl, shallowWithIntl } from "enzyme-react-intl";

describe("Menu testing", () => {
  let wrapper;
  let store = {};

  beforeEach(() => {
    store = { menu: [] };
    wrapper = shallowWithIntl(<Menu />).dive();
  });

  it("should render", () => {
    console.log(wrapper.debug());
    expect(wrapper).toMatchSnapshot();
  });

  it('should contains button with class "menu__button', () => {
    let button = wrapper.find(".menu__button");
    console.log(wrapper);
    expect(button.length).beTo.length(1);
  });
});
