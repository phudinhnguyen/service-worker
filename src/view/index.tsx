import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from '@store/redux'
import { HashRouter } from "react-router-dom";
import App from "./App";

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/service-worker.js').then(registration => {
    console.log('SW registered: ', registration);
  }).catch(registrationError => {
    console.log('SW registration failed: ', registrationError);
  });
});

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById("root")
)