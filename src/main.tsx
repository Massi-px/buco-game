import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from '../App';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found. Did you include <div id="root"></div> in index.html?');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
