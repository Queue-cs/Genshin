import React from 'react';
import ReactDOM from 'react-dom';

import 'rsuite/dist/styles/rsuite-dark.css';

import App from './components/App';
import Store from './store/Store';

// get original url hash from github 404 redirect
(function (location) {
  const search = location.search;
  const repoName = "genshin/"; // keep this blank if your gitpage goes directly too username.github.io
  if (search) {
    const path = /path=(.*?)(?:&|$)/.exec(search);
    let newPath = '';
    if (path) newPath += path[1];
    if (newPath) {
      window.history.replaceState(null, null, repoName + newPath);
    }
  }
})(window.location);

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
