import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import axios from 'axios';

const StreamsOverTime = () => {

    const [song, setSong] = useState('Song Title');
    const [timeA, setTimeA] = useState('');
    const [timeB, setTimeB] = useState('');
    const [currentData, setCurrentData] = useState(["XX"]);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('/STOT', { song: song, timeA: timeA, timeB: timeB})
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
            Streams Over Time
          </h1>
          <p1>
            &emsp; It's pretty easy to access how many streams a song has through
            your favorite music service.  But remembering each month's numbers?
            Well... a bit harder. But don't worry! Aura takes care of that for you!
            <br></br>
            <br></br>
            &emsp; Name a song and time frame and we'll show you how many streams that song
            has had over your time.  
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
                  <input type="text" value={ song } onChange={(e) => setSong(e.target.value)} />
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

export default StreamsOverTime;