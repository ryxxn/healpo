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
    <IndexedDBProvider>
      <ReactQueryProvider>
        <ToastProvider>
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <Router />
            </AnimatePresence>
          </BrowserRouter>
        </ToastProvider>
      </ReactQueryProvider>
    </IndexedDBProvider>
  );
}

export default App;
