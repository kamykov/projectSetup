import React, { useContext } from 'react';
import { Context } from '../../App';
import { SET_LANG } from '../../actions';

export default function LangSwitcher() {
  const {
    store: { lang },
    dispatch,
  } = useContext(Context);
  const langs = ['pl', 'en'];

  const setLang = (lang) => {
    dispatch({ type: SET_LANG, lang });
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
