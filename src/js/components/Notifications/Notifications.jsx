import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../App";

import { isEmpty } from "../../utils/helpers";

export default function Notifications() {
  const {
    store: { notifications }
  } = useContext(Context);
  const [classes, setClasses] = useState(["notifications"]);

  useEffect(() => {
    if (!isEmpty(notifications)) {
      setClasses(["notifications", "show"]);
      const timer = setTimeout(() => setClasses(["notifications"]), 2000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return (
    <div className={classes.join(" ")}>
      <div>
        {!isEmpty(notifications) && (
          <span className={`message ${notifications.type}`}>
            {notifications.message}
          </span>
        )}
      </div>
    </div>
  );
}
