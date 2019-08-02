import {
  SWITCH_MENU,
  SET_DOTS,
  SEND_NOTIFICATION,
  SET_LANG,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOGIN_SUCCES
} from "../actions";

export default (state, action) => {
  console.log(action);
  switch (action.type.substring(0, action.type.indexOf(":")) || action.type) {
    case SWITCH_MENU:
      return { ...state, isMenuOpen: !state.isMenuOpen };
    case SET_LANG:
      return { ...state, lang: action.lang };
    case SET_DOTS:
      return { ...state, dots: action.value };
    case SEND_NOTIFICATION:
      return {
        ...state,
        notifications: action.notifications
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        notifications: action.notifications
      };
    case LOGIN_FAIL:
      return {
        ...state,
        notifications: action.notifications
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        notifications: [{ type: "success", message: "Udana rejestracja" }]
      };
    case REGISTER_FAIL:
      return {
        ...state,
        notifications: [{ type: "error", message: "Lipna rejestracja" }]
      };
    case USER_LOGIN_SUCCES:
      return {
        ...state,
        users: action.users
      };
    default:
      return state;
  }
};
