import React, { useContext } from "react";
import { Context } from "../../App";

import { isEmpty } from "../../utils/helpers";

export default function Notifications() {
  const {
    store: { notifications },
    dispatch
  } = useContext(Context);
  let content;
  //const { errors, info, warning } = messages;
  const classes = isEmpty(notifications)
    ? "notifications"
    : "notifications show";
  console.log("notifications", notifications, Object.keys(notifications));
  //const show = Object.keys(messages) ? "show" : "hidden";
  if (!isEmpty(notifications)) {
    content = Object.keys(notifications).map((notification, index) => {
      return (
        <span key={notification + index} className="message">
          {notifications[notification]}
        </span>
      );
    });
  }

  return (
    <div className={classes}>
      <div>{content}</div>
    </div>
  );
}
