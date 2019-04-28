import { SWITCH_MENU } from "../actions/";

export default (state, action) => {
  switch (action.type) {
    case SWITCH_MENU:
      console.log(state);
      return { ...state, isMenuOpen: !state.isMenuOpen };
    default:
      return state;
  }
};
