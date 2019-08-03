import React, { useContext } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import Interweave, { Markup } from "interweave";
import { Context } from "../../App";
import Wrapper from "../../hoc/Wrapper/Wrapper";
import Headline from "../Headline/Headline";
import Slide from "../Slide/Slide";
import "./PageSlider.scss";
import Logo from "../../../img/logo.svg";
import storeReducer from "../../reducers/storeReducer";

function PageSlider({ content, location: { hash }, intl }) {
  const {
    store: { menu }
  } = useContext(Context);
  const links = menu.map(item => item.link);
  const pages = content.map(page => page.id);
  const current = Math.max(0, links.indexOf(hash.substring(1)));

  let sorted = links.map(key => content.find(page => page.id === key));
  //.reduce((set, item) => (item === undefined ? set : [...set, item]), []);

  console.log(pages, menu, sorted, hash, current);

  const body = sorted.map((page, index) => {
    const { title, subtitle, headline, content, translation, img } = page;
    const classes = [];
    const titleTranslation = intl.formatMessage({ id: translation });

    if (index === current) classes.push("active");
    if (index === (current + 1) % sorted.length) classes.push("next");
    if (index === (current === 0 ? sorted.length - 1 : current - 1))
      classes.push("previous");

    return (
      <div key={title} className={`page-slider__page ${classes.join(" ")}`}>
        {index === current && (
          <React.Fragment>
            <h1 className="page__title">
              {<Headline>{titleTranslation}</Headline>}
            </h1>
            <h2 className="page__subtitle">
              {subtitle && <Headline>{subtitle}</Headline>}
            </h2>
            <h3 className="page__title">{headline}</h3>
            <div className="page__text">
              <Slide delay={500}>
                <Markup content={content} />
              </Slide>
            </div>
          </React.Fragment>
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
