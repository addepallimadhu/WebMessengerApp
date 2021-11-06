import logo from "./logo.svg";
import "./App.css";
import Messenger from "./Components/Messenger.js";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import UserDropDown from "./Components/UserDropDown";
import { userName } from "./Components/Login";

function App() {
  return (
    <div className="App">
      <Messenger />
    </div>
  );
}

export default App;
