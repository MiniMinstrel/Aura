import { Link } from 'react-router-dom';
import * as React from 'react'; 
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RegionsRadio = () => {

  const [chart, setChart] = React.useState('top200');
  const [region, setRegion] = React.useState('Region Name');
  const [genre, setGenre] = React.useState('Genre');
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
      axios.post('/RR', { region: region, genre: genre, timeA: timeA, timeB: timeB })
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
                  <YAxis label={{ value: genre + "Songs In Top Charts", angle: -90, position: 'insideLeft' }} />
                  <Tooltip label={"Popularity"}/>
                  <Legend />
                  <Line connectNulls type="monotone" dataKey="1" name={region} stroke="#8884d8" activeDot={{ r: 8 }} />
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
                <p></p>
              </div>
              <div className='input-area-split'>
                <form>
                  <input type="text" value={ region } onChange={(e) => setRegion(e.target.value)} />
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

export default RegionsRadio;