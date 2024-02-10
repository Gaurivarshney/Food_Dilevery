import React from 'react';
import '../src/index.css'
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './context/StateProvider';
import { initialState } from './context/initialState';
import reducer from './context/reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
     <StateProvider initialState={initialState} reducer={reducer}>
     <App />
     </StateProvider>
  </BrowserRouter>
   
  
);

reportWebVitals();
