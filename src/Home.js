import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import AuraImage from './Aura.png'
import axios from 'axios';

const Home = () => {

  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Scroll to the top of the page whenever the component is mounted or updated
  //   window.scrollTo(0, 0);
  // }, [navigate]); // Scroll to the top of the page only when navigating to a new page

  const [total, setTotal] = useState('');
  const [rawValues, setRawValues] = useState('');
  const [totalChange, setTotalChange] = useState(false);

  useEffect(() => {
    if (totalChange) {
      console.log(rawValues);
      setTotal(rawValues[0]);
      alert("This database has a total of " + total + " tuples!");
      setTotalChange(false);
    }
  }, [total]);

  const tupleReturn = (event) => {
        event.preventDefault();
        Promise.all([
          axios.post('/alltuples1'),
          axios.post('/alltuples2'),
          axios.post('/alltuples3')
          ])
            .then(axios.spread((data1, data2, data3) => {
              // output of req.
              console.log([Number(data1.data[0]), Number(data2.data[0]), Number(data3.data[0])]);
              setTotal(Number(data1.data[0]) + Number(data2.data[0]) + Number(data3.data[0]));
              setTotalChange(true);
            }))
            .catch(error => console.error(error));
    }


    return (
      <div>
        <div className='AuraImage'>
          <img src={AuraImage} alt="Aura Image and Credits"></img>
        </div>
        <div className='divider'>
          <br></br>
        </div>
        <div className='about'>
          <h1>About Aura</h1>
          <p>
            Aura uses datasets gathered from Spotify
            to provide you with insightful information about
            some of your favorite artists and songs.  Aura gives
            you access to 5 customizeable queries that show
            different trends relating to artists, songs, charts,
            and regions.  
          </p>
          <div className='two-column'>
            <p className='left'>
              Explore your musical curiosity, with Aura.
            </p>
            <Link to="/Queries" className='right'>
            <button>
              Click here to get started
            </button>
            </Link>
          </div>
        </div>
        <br></br>
        <br></br>
        <div className='divider'>
        </div>
        <br></br>
        <div className='tuples'>
          <div className='tuples-left' onClick={ tupleReturn }>
            <button>Tuple Button!</button>
          </div>
          <div className='tuples-right'>
            <p>
              This is a magical button that will tell you Aura's darkest secret...<br>
              </br>
              <br></br>
              The number of tuples in our dataset!
            </p>
          </div>
        </div>
      </div>
    );
}

export default Home;