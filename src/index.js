import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./state/store/configureStore";
import { Provider } from "react-redux";
import { StripeProvider } from "react-stripe-elements";

const store = configureStore();
window.store = store;

ReactDOM.render(
  <StripeProvider apiKey="pk_test_51HuxwPB4iQLxMzwRoYvwIg9YWiZPJbCCNQvYgR53ye90XKjtqHZGIwJBbnOwoM0HRPf1YrQ0J44YJlUviKfXUTIU00HdNTkvl4">
    <Provider store={store}>
      <App />
    </Provider>
  </StripeProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
