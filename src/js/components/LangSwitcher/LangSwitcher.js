import React, { useContext } from "react";
import { Context } from "../../App";

export default function LangSwitcher() {
  const { dispatch } = useContext(Context);

  const setLang = lang => {
    dispatch({ type: "SET_LANG", lang });
  };

  return (
    <div className="langSwitcher">
      <button
        type="button"
        className="button--custom"
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <button
        type="button"
        className="button--custom"
        onClick={() => setLang("pl")}
      >
        PL
      </button>
    </div>
  );
}
