import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import AuraImage from './Aura.png'

const Home = () => {

    // const history = useHistory();
    // const Queries = () => {
    //   history.push("/TestQuery")
    // }

    return (
      <div>
        <div className='AuraImage'>
          <img src={AuraImage} alt="logo"></img>
        </div>
        <div className='about'>
          <h1>About Aura</h1>
          <p>
            Aura uses datasets gathered from Spotify
            to provide you with insightful information about
            some of your favorite artists and songs.  Aura gives
            you access to 5 customizeable queries that show
            different trends relating to artists, songs, charts,
            and regions.  
          </p>
          <div className='two-column'>
            <p className='left'>
              Explore your musical curiosity, with Aura.
            </p>
            <Link to="/Queries" className='right'>
            <button>
              Click here to get started
            </button>
            </Link>
          </div>
        </div>
        <ul>
          <li>
            <Link to="/Login">Login Page</Link>
            <br />
            <Link to="/Avgstreams">Avg Streams Query</Link>
            <br/>
            <Link to="/TestQuery">Test a Query!</Link>
          </li>
        </ul>
      </div>
    );
}

export default Home;