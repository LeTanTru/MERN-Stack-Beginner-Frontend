import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from '@/components/ui/provider';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api/v1';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
