import { SWITCH_MENU, SET_DOTS } from "../actions";

export default (state, action) => {
  switch (action.type) {
    case SWITCH_MENU:
      console.log(state);
      return { ...state, isMenuOpen: !state.isMenuOpen };
    case SET_DOTS:
      return { ...state, dots: action.value };
    default:
      return state;
  }
};
