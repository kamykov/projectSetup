import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Context } from "../../App";

function WingNav(props) {
  const {
    store: { menu }
  } = useContext(Context);
  const [current, setCurrent] = useState(0);

  const pathname = props.location.pathname;
  const links = menu.map(item => item.link);

  const currentIndex = links.indexOf(pathname.substring(1));

  console.log(props, current, pathname, menu, links, currentIndex);
  const goToPage = e => {
    console.dir(e.target.classList);

    props.history.push(`/${links[currentIndex + 1]}`);
  };

  return (
    <div className="wingnav">
      <button type="button" className="button-wingnav back" onClick={goToPage}>
        {`<`}
      </button>
      <button
        type="button"
        className="button-wingnav forward"
        onClick={goToPage}
      >
        {`>`}
      </button>
    </div>
  );
}

export default withRouter(WingNav);
