import React, { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

export default function Submenu() {
  return (
    <Fragment>
      <Link to={`/login`}>
        <FormattedMessage id={"Submenu.Login"} defaultMessage="Login" />
      </Link>
    </Fragment>
  );
}
