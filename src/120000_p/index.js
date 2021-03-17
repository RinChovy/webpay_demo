import 'es6-promise/auto';
import 'babel-polyfill';
import 'matchmedia-polyfill';
import 'matchmedia-polyfill/matchMedia.addListener';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './routes/index.js';

ReactDOM.render(<App />, document.getElementById('root'));
