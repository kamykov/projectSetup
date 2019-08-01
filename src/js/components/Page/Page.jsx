import React from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import Interweave, { Markup } from "interweave";
import Wrapper from "../../hoc/Wrapper/Wrapper";
import Headline from "../Headline/Headline";
import Slide from "../Slide/Slide";
import "./Page.scss";
import Logo from "../../../img/logo.svg";

function Page(props) {
  const { title, subtitle, headline, content } = props.content;
  const { intl } = props;
  console.log(title);
  const titleTranslation = intl.formatMessage({ id: title });
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
          <Slide delay={3000}>
            <Markup content={content} />
          </Slide>
        </div>
      </div>
    </div>
  );
}

export default injectIntl(Page);
