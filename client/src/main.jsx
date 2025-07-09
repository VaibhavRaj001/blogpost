import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './components/context/AppContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
);
