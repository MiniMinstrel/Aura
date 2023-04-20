import { Link } from 'react-router-dom';
import * as React from 'react'; 
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const SoundOfTime = () => {

  const [genre, setGenre] = React.useState('All');
  const [timeA, setTimeA] = React.useState('');
  const [timeB, setTimeB] = React.useState('');
  const [currentData, setCurrentData] = React.useState([["No Data"]]);
  const [filteredArray, setFilteredArray] = React.useState([]);

    React.useEffect(() => {
      const newFilteredArray = currentData.filter(childArray => {
        return !childArray.some(element => element === null);
      });
      setFilteredArray(newFilteredArray);
    }, [currentData]);


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/SOT', {genre: genre, timeA: timeA, timeB: timeB})
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
                  <YAxis label={{ value: genre + "Songs Released", angle: -90, position: 'insideLeft' }} />
                  <Tooltip label={genre + "Songs Released"}/>
                  <Legend />
                  <Line connectNulls type="monotone" dataKey="1" name={genre} stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
          
        </div>
        <div className='query-page-right'>
          <h1>Input</h1>
          <div className='input-area'>
            <div className='input-area-split'>
                <form>
                  <input type="text" value={ genre } onChange={(e) => setGenre(e.target.value)} />
                </form>
                <p>Genre</p>
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
                Please keep the dates between January 1st, 1900, and April 16, 2021 !
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

export default SoundOfTime;