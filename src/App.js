import { useState, useEffect } from 'react'; 
import axios from 'axios';
import "./App.css";
import AuraLogo from './Aura-logo.png'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home";
import Login from "./Login";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Avgstreams from "./avgstreams";
import TestQuery from "./TestQuery";
import Queries from "./Queries";
import SoundOfTime from './SoundOfTime';
import StylisticChanges from './StylisticChanges';
import RegionsRadio from './RegionsRadio';
import StreamsOverTime from './StreamsOverTime';
import PopularElements from './PopularElements';

  
function App() {

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0,0);
  }, [navigate]);

  return (

    // <Router>
      <div>
      
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
          <div className="app-header-words Aura-Header-left">
           <p>Welcome to Aura</p> 
          </div>
          <div className='Aura-Header-right'>
            <Link to="/">
            <button>
              <img src={AuraLogo} alt="logo"></img>
            </button>
            </Link>
          </div>
        </div>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Avgstreams" element={<Avgstreams/>} /> 
        <Route path="/Login" element={<Login/>} /> 
        <Route path="/TestQuery" element = {<TestQuery/>} />
        <Route path="/Queries">
          <Route index element = {<Queries/>} />
          <Route path="StreamsOverTime" element = {<StreamsOverTime/>} />
          <Route path="RegionsRadio" element = {<RegionsRadio/>} />
          <Route path="SoundOfTime" element = {<SoundOfTime/>} />
          <Route path="StylisticChanges" element = {<StylisticChanges/>} />
          <Route path="PopularElements" element = {<PopularElements/>} />
        </Route>
        {/* <Route path="*" element={<NotFound/>} /> */}
      </Routes>
      </div>
    // </Router>
  );
}


  
export default App;