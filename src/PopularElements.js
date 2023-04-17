import { Link } from 'react-router-dom';
import * as React from 'react'; 
import axios from 'axios';

const PopularElements = () => {
  const [AuraValue, setAuraValue] = React.useState(false);
  //This isnt right -- needs fixing


  
  const [timeA, setTimeA] = React.useState('');
  const [timeB, setTimeB] = React.useState('');
  const [currentData, setCurrentData] = React.useState(["XX"]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/STYCH', {AuraValue: AuraValue, timeA: timeA, timeB: timeB})
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
                  <select>
                    <option value="default">--Select--</option>
                    <option value="acousticness">Acousticness</option>
                    <option value="danceability">Danceability</option>
                    <option value="duration">Duration</option>
                    <option value="energy">Energy</option>
                    <option value="instrumentalness">Instrumentalness</option>
                    <option value="loudness">Loudness</option>
                    <option value="liveness">Liveness</option>
                    <option value="musical_key">Musical Key</option>
                    <option value="musical_mode">Musical Mode</option>
                    <option value="speechiness">Speechiness</option>
                    <option value="tempo">Tempo</option>
                    <option value="time_signature">Time Signature</option>
                    <option value="valence">Valence</option>
                  </select>
                </div>

                <p>Select an Aura value!</p>
                
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