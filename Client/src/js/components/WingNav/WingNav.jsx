import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Context } from '../../context/storeContext';
import { getCurrentIndex } from '../../utils/helpers';

function WingNav({ history, location }) {
  const {
    store: { menu },
  } = useContext(Context);

  const [current, setCurrent] = useState(1);
  const { pathname } = location;
  const links = menu.map((item) => item.link);
  const [backClasses, forwardClasses] = [
    ['button-wingnav', 'back'],
    ['button-wingnav', 'forward'],
  ];
  // eslint-disable-next-line no-unused-expressions
  current === 0 && backClasses.push('hidden');

  useEffect(() => {
    setCurrent(getCurrentIndex(links, pathname));
  }, []);

  // console.log(current, pathname);
  const goToPage = (e) => {
    setCurrent(getCurrentIndex(links, pathname));
    console.log(current, pathname);
    const isBack = e.target.classList.contains('back');
    const next = (isBack ? current - 1 : current + 1) % links.length;
    console.log(next);
    history.push(`/${links[next]}`);
    history.push(`/${links[next]}`);
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

WingNav.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,

};

export default withRouter(WingNav);
