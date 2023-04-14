import { useState, useEffect } from 'react'; 
import axios from 'axios';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home";
import Login from "./Login";
import Avgstreams from "./avgstreams";
import TestQuery from "./TestQuery";
import Queries from "./Queries";

  
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

    <Router>
      
    {/* <div className="App">
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
        </div>*/}
        <div className="Aura-Header">
          <div className="app-header-words">
           <p>Welcome to Aura</p> 
          </div>
        </div>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Avgstreams" element={<Avgstreams/>} /> 
        <Route path="/Login" element={<Login/>} /> 
        <Route path="/TestQuery" element = {<TestQuery/>} />
        <Route path="/Queries" element = {<Queries/>} />
        {/* <Route path="*" element={<NotFound/>} /> */}
      </Routes>

    </Router>
  );
}


  
export default App;