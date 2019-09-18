/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { Markup } from 'interweave';
import axios from 'axios';
import { Context } from '../../context/storeContext';
import Headline from '../Headline/Headline';
import Slide from '../Slide/Slide';
import Loading from '../Loading/Loading';
import './PageSlider.scss';
import Logo from '../../../img/logo.svg';
import { storageAvailable } from '../../utils/helpers';

import { SET_LANG, SET_DOTS } from '../../actions';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});

function PageSlider({ location: { hash }, intl }) {
  const {
    store: { menu, lang }, dispatch,
  } = useContext(Context);

  const [data, setData] = useState([]);
  const [body, setBody] = useState(undefined);
  const current = Math.max(
    0,
    menu.map((item) => item.link).indexOf(hash.substring(1)),
  );
  const sorted = menu.map((item) => data.find((page) => page.id === item.link));

  useEffect(() => {
    if (storageAvailable('localStorage')) {
      const storedLang = localStorage.getItem('lang');
      const dots = parseInt(localStorage.getItem('dots'), 10);
      if (storedLang) dispatch({ type: SET_LANG, lang: storedLang });
      if (dots) dispatch({ type: SET_DOTS, value: dots });
    }
    return () => { };
  }, []);

  useEffect(() => {
    instance
      .get('/data')
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
    return () => {
    };
  }, []);

  useEffect(() => {
    if (data.length) {
      const newBody = sorted.map((page, index) => {
        const {
          title, subtitle, headline, content, translation,
        } = page;
        const titleTranslation = intl.formatMessage({ id: translation });
        const headlineTranslation = headline
          ? intl.formatMessage({ id: headline })
          : '';
        const classes = [];

        if (index === current) classes.push('active');
        if (index === (current + 1) % sorted.length) classes.push('next');
        if (index === (current === 0 ? sorted.length - 1 : current - 1)) { classes.push('previous'); }

        return (
          <div key={title} className={`page-slider__page ${classes.join(' ')}`}>
            {index === current && (
              <>
                <h1 className="page__title">
                  {<Headline>{titleTranslation}</Headline>}
                </h1>
                <h2 className="page__subtitle">
                  {subtitle && <Headline>{subtitle}</Headline>}
                </h2>
                <h3 className="page__title">{headlineTranslation}</h3>
                <div className="page__text">
                  <Slide delay={500}>
                    <Markup content={content[lang]} />
                  </Slide>
                </div>
              </>
            )}
          </div>
        );
      });
      setBody(newBody);
    }
    return () => { };
  }, [data, hash]);

  return (
    <div className="page-slider">
      <Logo />
      {body === undefined ? (<Loading />) : (<div className="page-slider__content">{body}</div>)}
    </div>
  );
}

PageSlider.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
  }),
  intl: intlShape.isRequired,
};

PageSlider.defaultProps = {
  location: PropTypes.shape({
    hash: '',
  }),
};

export default injectIntl(withRouter(PageSlider));
