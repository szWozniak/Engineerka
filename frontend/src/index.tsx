import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './styles/index.scss';
import QueryClientContext from './conext/QueryClientContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientContext>
      <App />
    </QueryClientContext>
  </React.StrictMode>
);