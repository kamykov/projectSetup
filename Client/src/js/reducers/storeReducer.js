import {
  SWITCH_MENU,
  SET_DOTS,
  SEND_NOTIFICATION,
  SET_LANG,
  USER_LOGIN_SUCCES
} from "../actions";

export default (state, action) => {
  switch (action.type.substring(0, action.type.indexOf(":")) || action.type) {
    case SWITCH_MENU:
      return { ...state, isMenuOpen: !state.isMenuOpen };
    case SET_LANG: {
      localStorage.setItem("lang", action.lang);
      return { ...state, lang: action.lang };
    }
    case SET_DOTS:
      localStorage.setItem("dots", action.value);
      return { ...state, dots: action.value };
    case SEND_NOTIFICATION:
      return {
        ...state,
        notifications: action.notifications
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
