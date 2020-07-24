import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DataContextProvider from './contexts/DataContext';

ReactDOM.render(
  <React.Fragment>
    <DataContextProvider>
      <App />
      </DataContextProvider>
  </React.Fragment>,
  document.getElementById('root')
);
