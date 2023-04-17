import { Link } from 'react-router-dom';
import * as React from 'react'; 
import axios from 'axios';

const SoundOfTime = () => {

  const [genre, setGenre] = React.useState('Genre');
  const [timeA, setTimeA] = React.useState('');
  const [timeB, setTimeB] = React.useState('');
  const [currentData, setCurrentData] = React.useState(["XX"]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/STYCH', {timeA: timeA, timeB: timeB})
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
          Sound of Time
        </h1>
        <p1>
          Just as music affects history, history affects music.  With Sound of Time, you can
          see how much music was being released throughout history.  This can tell you information about
          the state of the world during that period.
          <br></br>
          <br></br>
          If you choose, you can specify your choice of music by genre to see how popular that genre was
          among artists during that time.
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
                  <input type="text" value={ genre } onChange={(e) => setGenre(e.target.value)} />
                </form>
                <p></p>
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

export default SoundOfTime;