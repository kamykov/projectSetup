import {
  SWITCH_MENU,
  SET_DOTS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../actions";

export default (state, action) => {
  switch (action.type) {
    case SWITCH_MENU:
      return { ...state, isMenuOpen: !state.isMenuOpen };
    case "SET_LANG":
      return { ...state, lang: action.lang };
    case SET_DOTS:
      return { ...state, dots: action.value };
    case LOGIN_SUCCESS:
      return {
        ...state,
        notifications: { type: "success", message: "Zalogowano pomyślnie" }
      };
    case LOGIN_FAIL:
      return {
        ...state,
        notifications: { type: "error", message: "Błąd logowania" }
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        notifications: { type: "success", message: "Udana rejestracja" }
      };
    case REGISTER_FAIL:
      return {
        ...state,
        notifications: { type: "error", message: "Lipna rejestracja" }
      };
    default:
      return state;
  }
};
