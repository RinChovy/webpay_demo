require('matchmedia-polyfill');
require('matchmedia-polyfill/matchMedia.addListener');

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './routes/index.js';

ReactDOM.render(<App />, document.getElementById('root'));