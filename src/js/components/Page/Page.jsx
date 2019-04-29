import React from "react";
import "./Page.scss";

export default function Page(props) {
  const { title, img, content } = props.content;
  return (
    <div className="page">
      <div className="page__content">
        <h1 className="page__title">{title}</h1>
        <div className="page__text">{content}</div>
      </div>
    </div>
  );
}
