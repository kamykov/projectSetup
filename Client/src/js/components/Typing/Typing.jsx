/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Animletter from '../Animletter/Animletter';

export default function Typing({ codeset, delay }) {
  const [content, setContent] = useState('');
  useEffect(() => {
    let idx = 0;
    const newContent = codeset
      .replace(/(?:\r\n|\r|\n)/g, '<br>')
      .split('<br>')
      .reduce((all, word) => {
        let setword = word.split('')
          .map((letter) => {
            idx += 1;

            return (
              <Animletter key={`${word}${idx}`} index={idx}>
                {letter}
              </Animletter>
            );
          });
        setword = (<div key={`word${idx}`}>{[...setword]}</div>);
        return [...all, setword];
      }, []);
    setTimeout(() => {
      setContent(newContent);
    }, delay);
  }, [codeset, delay]);


  return (
    <div className="typing">
      {content}
    </div>
  );
}

Typing.propTypes = {
  codeset: PropTypes.string,
  delay: PropTypes.number,
};
Typing.defaultProps = {
  delay: 4000,
  codeset: `<div class='outside_viewport'>
  <div id="contents-modal" class="modal fade mini-modal" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
               <h1>Contents</h1>
               <button class="close-button icon icon-close-light" data-dismiss="modal" aria-label="close"></button>
            </div>
        <div class="modal-body">
    <div class="table-of-contents-modal"></div>
  </div>
</div>
<div class='outside_viewport'>
  <div id="contents-modal" class="modal fade mini-modal" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
               <h1>Contents</h1>
               <button class="close-button icon icon-close-light" data-dismiss="modal" aria-label="close"></button>
            </div>
        <div class="modal-body">
    <div class="table-of-contents-modal"></div>
  </div>
</div>`,
};
