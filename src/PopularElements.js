import { Link } from 'react-router-dom';
import * as React from 'react'; 
import axios from 'axios';

const PopularElements = () => {

  const [AuraValue, setAuraValue] = React.useState('');
  const [timeA, setTimeA] = React.useState('');
  const [timeB, setTimeB] = React.useState('');
  const [params, setParams] = React.useState([]);
  const [currentData, setCurrentData] = React.useState(["XX"]);

  const handleSubmit = (event) => {
    if (AuraValue == 'delicate') {
      setParams([0.5, 1.0, 0.0, 0.49]);
    } else if (AuraValue == 'mellow') {
      setParams([0.0, 0.49, 0.0, 0.49]);
    } else if (AuraValue == 'spirited') {
      setParams([0.0, 0.49, 0.5, 1.0]);
    } else if (AuraValue == 'wild') {
      setParams([0.5, 1.0, 0.5, 1.0]);
    }
    event.preventDefault();
    axios.post('/PE', {params: params, timeA: timeA, timeB: timeB})
          .then(response => {
              console.log(response.data);
              setCurrentData(response.data);
          })
          .catch(error => console.error(error));
  }


  return (
    <div>
      <div className='query-page-about'>
        <h1>
          Popular Elements
        </h1>
        <p1>
          The sound of music is nowhere near constant. 
          Styles are endlessly changing in several ways.  Here at Aura,
          we've quantified the change of the elements in music, and let
          you see how the popularity of these elements changes over time.
        </p1>
      </div>
      <br></br>
      <br></br>
      <div className='divider'>
            <br></br>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className='query-page'>

        
        <div className='query-page-left'>
          <h1>Graph</h1>
          
        </div>
        <div className='query-page-right'>
          <h1>Input</h1>

          <div className='input-area'>
              <div className='input-area-split'>

                <div>
                  <select value={ AuraValue } onChange={(e) => setAuraValue(e.target.value)}>
                    <option value="default">--Select--</option>
                    <option value="delicate">Delicate</option>
                    <option value="mellow">Mellow</option>
                    <option value="spirited">Spirited</option>
                    <option value="wild">Wild</option>
                  </select>
                </div>

                <p>Aura Value</p>
                
              </div>

              <div className='input-area-split'>
                <form>
                  <input type="date" value={ timeA } onChange={(e) => setTimeA(e.target.value)} />
                </form>
                <p>
                    Start Date
                </p>
              </div>

              <div className='input-area-split'>
                <form>
                  <input type="date" value={ timeB } onChange={(e) => setTimeB(e.target.value)} />
                </form>
                <p>
                  End Date
                </p>
              </div>
              
              <div className='input-area-split'>
                <form onSubmit={handleSubmit}>    
                  <button type="submit">Submit</button>
                </form>
              </div>

              
              
              
            </div>
        </div>

      </div>
    </div>
  );
}

export default PopularElements;