import { SWITCH_MENU, SET_DOTS } from "../actions";

export default (state, action) => {
  switch (action.type) {
    case SWITCH_MENU:
      console.log(state);
      return { ...state, isMenuOpen: !state.isMenuOpen };
    case SET_DOTS:
      return { ...state, dots: action.value };
    case "LOGIN_SUCCESS":
      return { ...state, notifications: { info: action.message } };
    case "LOGIN_FAIL":
      return { ...state, notifications: { errors: action.message } };
    default:
      return state;
  }
};
