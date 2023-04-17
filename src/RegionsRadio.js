import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import axios from 'axios';

const RegionsRadio = () => {

  const [chart, setChart] = useState('top200');
  const [region, setRegion] = useState('Region Name');
  const [genre, setGenre] = useState('Genre Name');
  const [timeA, setTimeA] = useState('');
  const [timeB, setTimeB] = useState('');
  const [currentData, setCurrentData] = useState(["XX"]);

  const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('/RR', { chart: chart, region: region, genre: genre, timeA: timeA, timeB: timeB })
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
          Regions Radio
        </h1>
        <p1>
          Regions Radio allows you access to see how popular a genre is
          in another part of the world.  The resulting graph tells you often 
          a genre makes it into the top charts on the monthly average.
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
                <form>
                  <select value={ chart } onChange={(e) => setChart(e.target.value)}>
                    <option value="top200">top200</option>
                    <option value="viral50">viral50</option>
                  </select>
                </form>
                <p>Chart Type</p>
              </div>
              <div className='input-area-split'>
                <form>
                  <input type="text" value={ region } onChange={(e) => setRegion(e.target.value)} />
                </form>
                <p></p>
              </div>
              <div className='input-area-split'>
                <form>
                  <input type="text" value={ genre } onChange={(e) => setGenre(e.target.value)} />
                </form>
                <p></p>
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

export default RegionsRadio;