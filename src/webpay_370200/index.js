// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill');

// require('matchmedia-polyfill');
// require('matchmedia-polyfill/matchMedia.addListener');
// require('fetch-ie8');

// import 'es5-shim';
// import 'es5-shim/es5-sham';
// import 'console-polyfill';
// import 'fetch-ie8';
import 'matchmedia-polyfill';
import 'matchmedia-polyfill/matchMedia.addListener';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './routes/index.js';

ReactDOM.render(<App />, document.getElementById('root'));
