import React, { useContext } from 'react';
import { SET_LANG } from '../../actions';
import { Context } from '../../context/storeContext';

export default function LangSwitcher() {
  const {
    store: { lang },
    dispatch,
  } = useContext(Context);
  const langs = ['pl', 'en'];

  const setLang = (newLang) => {
    dispatch({ type: SET_LANG, lang: newLang });
  };

  const content = langs.map((language) => {
    const classess = language === lang ? 'button--nav active' : 'button--nav';
    return (
      <button
        type="button"
        className={classess}
        onClick={() => setLang(language)}
        key={language}
      >
        {language}
      </button>
    );
  });

  return <div className="langSwitcher">{content}</div>;
}
