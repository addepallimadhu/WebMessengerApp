import logo from './logo.svg';
import './App.css';
import Messenger from './Components/Messenger.js';
import Login from './Components/Login';
import Logout from './Components/Logout';
import UserDropDown from './Components/UserDropDown';
import {userName} from './Components/Login';


function App() {

  

  return (
    <div className="App">
  {/*     <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
     
      <br />
       
      <Messenger/>
      <Logout/>
    </div>
 
  );
}

export default App;
