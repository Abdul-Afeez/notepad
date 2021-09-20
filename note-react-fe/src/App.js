import React from 'react';
import './App.css';
import store from "./Store/Reducers";
import {Provider} from "react-redux";
import {AppRoot} from "./components/AppRoot";

function App() {

  return <Provider store={store}>
    <AppRoot />
  </Provider>

}

export default App;
// eslint-disable-next-line no-unused-vars
