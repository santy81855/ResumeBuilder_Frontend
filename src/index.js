import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "mobx-react"; // import Provider
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store"; // import your store

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            {" "}
            {/* wrap your App with Provider and pass your store */}
            <App />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
