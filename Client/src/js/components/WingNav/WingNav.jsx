import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Context } from '../../App';
import { getCurrentIndex } from '../../utils/helpers';

function WingNav(props) {
  const {
    store: { menu },
  } = useContext(Context);

  const [current, setCurrent] = useState(1);
  const { pathname } = props.location;
  const links = menu.map((item) => item.link);
  const [backClasses, forwardClasses] = [
    ['button-wingnav', 'back'],
    ['button-wingnav', 'forward'],
  ];
  current === 0 && backClasses.push('hidden');

  useEffect(() => {
    setCurrent(getCurrentIndex(links, pathname));
  }, []);

  const goToPage = (e) => {
    const isBack = e.target.classList.contains('back');
    const next = (isBack ? current - 1 : current + 1) % links.length;
    props.history.push(`/slider#${links[next]}`);
    props.history.push(`/slider#${links[next]}`);
    setCurrent(next);
  };

  return (
    <div className="wingnav">
      <button
        type="button"
        className={backClasses.join(' ')}
        onClick={goToPage}
      >
        {'<'}
      </button>
      <button
        type="button"
        className={forwardClasses.join(' ')}
        onClick={goToPage}
      >
        {'>'}
      </button>
    </div>
  );
}

export default withRouter(WingNav);
