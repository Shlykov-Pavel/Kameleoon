import React, { StrictMode } from 'react';


import { createRoot } from 'react-dom/client';



import App from './app/App';
import { Provider } from 'react-redux';
import { store } from './entities/store/store';




const container = document.getElementById('root');
const root = createRoot(container!);


root.render(
  <StrictMode>

<Provider store={store}>
    <App />
  </Provider>
  </StrictMode>
);
