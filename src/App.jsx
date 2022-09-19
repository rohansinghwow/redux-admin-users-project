import React from "react";
import { Provider } from "react-redux";
import { store } from "./Redux/features/store";
import Login from "./Components/Login";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);
export default () => (
  <>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Login />
      </PersistGate>
    </Provider>
  </>
);
