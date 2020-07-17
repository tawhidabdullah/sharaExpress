import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


// Add this react hot realoader:
import { AppContainer } from 'react-hot-loader';




// Wrap the rendering in a function:
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>
    ,
    document.getElementById('root')
  );
};


// Render once
render();


// Webpack Hot Module Replacement API
if (module['hot']) {
  module['hot'].accept('./App', () => {
    render();
  });
}