import React from 'react';
import ReactDOM from 'react-dom/client';
import Town from './App.tsx';
import Home from './index.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css';
import 'uplot/dist/uPlot.min.css';
import 'react-toastify/dist/ReactToastify.css';
import ConvexClientProvider from './components/ConvexClientProvider.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <ConvexClientProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/town" element={<Town />} />
        </Routes>
      </ConvexClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
