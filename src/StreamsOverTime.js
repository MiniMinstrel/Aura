import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const StreamsOverTime = () => {

    const [song, setSong] = useState('Song Title');
    const [timeA, setTimeA] = useState('');
    const [timeB, setTimeB] = useState('');
    const [currentData, setCurrentData] = useState([["No Data Yet"]]);
    const [filteredArray, setFilteredArray] = useState([]);

    useEffect(() => {
      const newFilteredArray = currentData.filter(childArray => {
        return !childArray.some(element => element === null);
      });
      setFilteredArray(newFilteredArray);
    }, [currentData]);

  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('/STOT', { song: song, timeA: timeA, timeB: timeB})
            .then(response => {
                setCurrentData(response.data);
                console.log(response.data);
                console.log(filteredArray);
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
            <ResponsiveContainer width="90%" height="90%">
              <LineChart
                data={filteredArray}
                margin={{
                  top: 30,
                  right: 0,
                  left: 60,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="0" label={{ value: 'Month', position: 'insideBottomRight', offset: 0 }} />
                <YAxis label={{ value: 'Avg. Streams', angle: -90, position: 'insideLeft' }} />
                <Tooltip label={"Avg. Streams"}/>
                <Legend />
                <Line connectNulls type="monotone" dataKey="1" name="Streams" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
          </ResponsiveContainer>

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
              <p className='timeRestraint'>
                Please keep the dates between January 1st, 2017, and December 15, 2021 !
              </p>
              
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