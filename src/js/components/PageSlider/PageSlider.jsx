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
import { getCurrentIndex } from "../../utils/helpers";
import storeReducer from "../../reducers/storeReducer";

function PageSlider(props) {
  const {
    store: { menu }
  } = useContext(Context);
  const hash = props.location.hash;
  const links = menu.map(item => item.link);
  const pages = props.content.map(page => {
    let content = page[Object.keys(page).pop()];
    content.title = Object.keys(page).pop();
    return content;
    //return keys.map(key => page[key]);
  });
  const { intl } = props;

  const current = Math.max(0, links.indexOf(hash.substring(1)));

  let sorted = menu
    .map(item => item.link)
    .map(key => {
      return pages.find(page => page.title === key);
    })
    .reduce((set, item) => {
      if (item === undefined) return set;
      return [...set, item];
    }, []);
  console.log(props, pages, menu, sorted, hash, current);

  //const { intl } = props;

  let content = sorted.map((page, index) => {
    let classes = [];
    const { title, subtitle, headline, content, img } = page;
    console.log(current, index);
    if (index === current) classes.push("active");
    if (index - 1 === current || (index === 0 && current === sorted.length - 1))
      classes.push("next");
    if (index + 1 === current || (current === 0 && index === sorted.length - 1))
      classes.push("previous");
    let titleTranslation = intl.formatMessage({ id: title });
    return (
      <div key={title} className={`page-slider__page ${classes.join(" ")}`}>
        <h1 className="page__title">
          {<Headline>{titleTranslation}</Headline>}
        </h1>
        <h2 className="page__subtitle">
          {subtitle && <Headline>{subtitle}</Headline>}
        </h2>
        <h3 className="page__title">{headline}</h3>
        <div className="page__text">
          <Slide delay={3000}>
            <Markup content={content} />
          </Slide>
        </div>
      </div>
    );
  });

  return (
    <div className="page-slider">
      <button type="button" className="button">
        Next
      </button>
      <Logo />
      <div className="page-slider__content">{content}</div>
    </div>
  );
}

export default injectIntl(withRouter(PageSlider));
