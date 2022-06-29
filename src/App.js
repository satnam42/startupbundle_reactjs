import "./App.css";
import { useEffect } from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import configStore from './redux/configStore'
import { Provider } from 'react-redux'
import firebase from './firebase'
function App() {
  const store = configStore();
  useEffect(() => {
    const msg = firebase.messaging();
    console.log("msgggg     ", msg)
    msg.requestPermission().then(() => {
      return msg.getToken();
    }).then((data) => {
      console.log("tokennnnnn   ", data)
    })
    return () => {

    }
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
}
export default App;
