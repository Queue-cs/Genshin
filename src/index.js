import React from 'react';
import ReactDOM from 'react-dom';

// import './css/index.css';
import 'rsuite/dist/styles/rsuite-dark.css';

import App from './components/App';
import Store from './store/Store';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
ReactDOM.render(
  <App store={Store} />,
  document.getElementById('root')
);
