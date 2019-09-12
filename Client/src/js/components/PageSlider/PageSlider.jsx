import React, { useContext } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { Markup } from 'interweave';
import { Context } from '../../context/storeContext';
import Headline from '../Headline/Headline';
import Slide from '../Slide/Slide';
import './PageSlider.scss';
import Logo from '../../../img/logo.svg';

function PageSlider({ content, location: { hash }, intl }) {
  const {
    store: { menu, lang },
  } = useContext(Context);
  const current = Math.max(
    0,
    menu.map((item) => item.link).indexOf(hash.substring(1)),
  );
  const sorted = menu.map((item) => content.find((page) => page.id === item.link));

  const body = sorted.map((page, index) => {
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

  return (
    <div className="page-slider">
      <Logo />
      <div className="page-slider__content">{body}</div>
    </div>
  );
}

export default injectIntl(withRouter(PageSlider));
