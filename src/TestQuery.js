import { useState, useEffect } from 'react'; 
import axios from 'axios';


const TestQuery = () => {

    const [currentData, setCurrentData] = useState(["default.jpg"]);
    const [params, setParams] = useState('');
  
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/testQuery?genre=' + params, { params })
            .then(response => {
                console.log(response.data);
                setCurrentData(response.data);
            })
            .catch(error => console.error(error));
    }

    return(

        <div>
            <div className="about">
                <h1>Test Query</h1>
                <p>This is a test query to play around with querying the database and see how to implement it 
                    on the front end of the website.
                </p>
                <br/>
                <p>
                    Here's a sample form that allows you to search for the top five artists that have music in X genre of choice.:
                </p>

                <form onSubmit={handleSubmit}>
                    <input type="text" value={ params } onChange={(e) => setParams(e.target.value)} />
                    <button type="submit">Submit</button>
                </form>
            </div>
            {currentData.map((k, index) => (
        <p>{index+1}. {k[0]}: <b>{k[1]}</b></p>
          ))}
        </div>

        

    );
}

export default TestQuery;