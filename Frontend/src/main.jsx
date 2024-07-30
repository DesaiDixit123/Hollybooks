import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobContext from "./GlobContext.jsx";
import { Provider } from "react-redux";
import { persisterStore, Store } from "./redux/Store.jsx";
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persisterStore}>
      <GlobContext>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          bodyClassName="toastBody"
        />
      </GlobContext>
    </PersistGate>
  </Provider>
);
