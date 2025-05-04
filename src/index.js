import React from 'react';
import ReactDOM from 'react-dom/client';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // PrimeReact theme
 
import 'primeicons/primeicons.css'; // Icons
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient= new QueryClient();
root.render(
 
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
   
);