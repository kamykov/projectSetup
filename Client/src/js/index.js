/* eslint-env browser */
import React from 'react';
import Reactdom from 'react-dom';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import pl from 'react-intl/locale-data/pl';
import App from './App';

addLocaleData([...en, ...pl]);

Reactdom.render(<App />, document.getElementById('app'));
