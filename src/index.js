import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import stats from './stats.json'

ReactDOM.render(<App stats={stats} />, document.getElementById('root'));

serviceWorker.unregister();
