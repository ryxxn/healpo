import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  ToastProvider,
  IndexedDBProvider,
  ReactQueryProvider,
} from './providers';
import { Router } from './route';
import { BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <ReactQueryProvider>
      <ToastProvider>
        <IndexedDBProvider>
          <AnimatePresence>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </AnimatePresence>
        </IndexedDBProvider>
      </ToastProvider>
    </ReactQueryProvider>
  );
}

export default App;
