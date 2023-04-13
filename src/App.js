import logo from "./logo.svg";
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import "./App.css";
  
function App() {

  const [currentData, setCurrentData] = useState(["default.jpg"]);

  useEffect(() => {
    axios.get('/artists')
    .then(response => {
      const data = response.data;
      setCurrentData(data);
    })
    .catch(error => {
      console.error(error);
    })
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" 
             alt="logo" />
          {currentData.map(k => (
        <p>{k}</p>
          ))}
  
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <form action="../../post" method="post" 
              className="form">
          <button type="submit">Connected?</button>
        </form>
      </header>
    </div>
  );
}
  
export default App;