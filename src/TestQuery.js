import { useState, useEffect } from 'react'; 
import axios from 'axios';


const TestQuery = () => {

    const [currentData, setCurrentData] = useState(["default.jpg"]);
  
    useEffect(() => {
      axios.get('/artists')
      .then(response => {
        const data = response.data;
        setCurrentData(data);
      })
      .catch(error => {
        console.error(error);
      })
    })

    return(

        <div>
            <div className="about">
                <h1>Test Query</h1>
                <p>This is a test query to play around with querying the database and see how to implement it 
                    on the front end of the website.
                </p>
                <br/>
                <p>
                    Here we should get 5 artists:
                </p>

            </div>

            {currentData.map(k => (
            <p>{k}</p>
              ))}

        </div>

        

    );
}

export default TestQuery;