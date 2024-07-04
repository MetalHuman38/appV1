import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserProvider from './lib/context/userContext';
import QueryProvider from './lib/react-query/QueryProvider';
import App from './App';
import { initializeAxiosHeaders } from './lib/utils';

initializeAxiosHeaders();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <UserProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </UserProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>
);
