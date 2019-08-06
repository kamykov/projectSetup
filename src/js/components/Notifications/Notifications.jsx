import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Context } from "../../App";

import { isEmpty } from "../../utils/helpers";

export default function Notifications() {
  const {
    store: { notifications }
  } = useContext(Context);
  const [classes, setClasses] = useState(["notifications"]);
  let content = null;

  useEffect(() => {
    if (!isEmpty(notifications)) {
      setClasses(["notifications", "show"]);
      const timer = setTimeout(() => setClasses(["notifications"]), 2000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  if (!isEmpty(notifications)) {
    content = notifications.map(notification => (
      <span
        className={`message ${notification.type}`}
        key={notification.message}
      >
        <FormattedMessage
          id={notification.message}
          defaultMessage="Notification Message"
        />
      </span>
    ));
  }

  return <div className={classes.join(" ")}>{content}</div>;
}
