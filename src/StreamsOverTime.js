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
            [paragraph about query]
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
            <form onSubmit={handleSubmit}>
                    <input type="text" value={ song } onChange={(e) => setSong(e.target.value)} />
                    <input type="date" value={ timeA } onChange={(e) => setTimeA(e.target.value)} />
                    <input type="date" value={ timeB } onChange={(e) => setTimeB(e.target.value)} />
                    <button type="submit">Submit</button>
            </form>
          </div>

        </div>
      </div>
    );
}

export default StreamsOverTime;