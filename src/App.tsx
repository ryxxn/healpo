import './App.css';
import {
  ToastProvider,
  IndexedDBProvider,
  ReactQueryProvider,
} from './providers';
import { Router } from './route';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <IndexedDBProvider>
      <ReactQueryProvider>
        <ToastProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ToastProvider>
      </ReactQueryProvider>
    </IndexedDBProvider>
  );
}

export default App;
