import React from "react";
import { injectIntl } from "react-intl";
import { Markup } from "interweave";
import Headline from "../Headline/Headline";
import Slide from "../Slide/Slide";
import "./Page.scss";
import Logo from "../../../img/logo.svg";

function Page({ content: { translation, subtitle, headline, content }, intl }) {
  const titleTranslation = intl.formatMessage({ id: translation });
  return (
    <div className="page">
      <div className="page__content">
        <Logo />
        <h1 className="page__title">
          <Headline>{titleTranslation}</Headline>
        </h1>
        <h2 className="page__subtitle">
          {subtitle && <Headline>{subtitle}</Headline>}
        </h2>
        <h3 className="page__title">{headline}</h3>
        <div className="page__text">
          <Slide delay={1000}>
            <Markup content={content} />
          </Slide>
        </div>
      </div>
    </div>
  );
}

export default injectIntl(Page);
