import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// ✅ Load Ant Design global styles
import 'antd/dist/reset.css'; // For Ant Design v5+
import './index.css'; // Custom global styles (optional but recommended)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
