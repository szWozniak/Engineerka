import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './styles/index.scss';
import QueryClientContext from './context/QueryClientContext';
import AppContextProvider from './context/AppContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientContext>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </QueryClientContext>
  </React.StrictMode>
);