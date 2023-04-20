import { Link } from 'react-router-dom';
import * as React from 'react'; 
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const StylisticChanges = () => {


  const [AuraValue, setAuraValue] = React.useState('accousticness');
  const [artist, setArtist] = React.useState('Artist');  
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
    axios.post('/STYCH', {AuraValue: AuraValue, artist: artist, timeA: timeA, timeB: timeB})
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
          Stylistic Changes
        </h1>
        <p1>
          &emsp; Creativity doesn't flow in a straight line.  Artists sometimes spend years changing their styles to try and perfect their craft.
          With Aura's Stylistic Changes function, you can see how an individual artist has changed elements of their music over time, giving you quantified
          insight into their relationship with music.
        </p1>
      </div>
      <br></br>
      <br></br>
      <div className='divider'>
            <br></br>
      </div>
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
                  <YAxis label={{ value: AuraValue, angle: -90, position: 'insideLeft' }} />
                  <Tooltip label={AuraValue}/>
                  <Legend />
                  <Line connectNulls type="monotone" dataKey="1" name={artist} stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
          
        </div>
        <div className='query-page-right'>
          <h1>Input</h1>

          <div className='input-area'>
              <div className='input-area-split'>

                <div>
                  <select value={ AuraValue } onChange={(e) => setAuraValue(e.target.value)}>
                    <option value="accousticness">Accousticness</option>
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

                <p>Sound Measure</p>
                
              </div>

              <div className='input-area-split'>
                <form>
                  <input type="text" value={ artist } onChange={(e) => setArtist(e.target.value)} />
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

export default StylisticChanges;