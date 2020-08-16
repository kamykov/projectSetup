import React from 'react';
import { mount, shallow } from 'enzyme';
import { mountWithIntl, shallowWithIntl } from "enzyme-react-intl";
import Headline from "./Headline.jsx";

describe('Headline component testing', () => {
  let wrapper;

  beforeEach(() => {
    store = { menu: [] };
    wrapper = shallow(<Headline />).dive();
  });

  it('Metches the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
  });

});
