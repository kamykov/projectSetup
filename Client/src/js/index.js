/* eslint-env browser */
import React from 'react';
import Reactdom from 'react-dom';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import pl from 'react-intl/locale-data/pl';

import { StoreProvider } from './context/storeContext';
import App from './App';

addLocaleData([...en, ...pl]);

console.log('Hello devs! 😎');

Reactdom.render(<StoreProvider><App /></StoreProvider>, document.getElementById('app'));
