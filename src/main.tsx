import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/ui/app';
import '@/ui/shared/styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
