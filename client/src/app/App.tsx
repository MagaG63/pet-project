import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router";
import "./App.css";
import Router from "./Routes/Router";

function App() {


  return (
    <BrowserRouter>
      <Provider store={store}>
        <Router />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
