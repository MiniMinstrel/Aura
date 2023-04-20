import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const Queries = () => {

  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Scroll to the top of the page whenever the component is mounted or updated
  //   window.scrollTo(0, 0);
  // }, [navigate]); // Scroll to the top of the page only when navigating to a new page


    return (
      <div>
        <div className='about'>
          <h1>Feeling <i>Querious?</i></h1>
          <p>
            Here, you can decide the
            type of information that you look into.  Give
            each page a brief scan to see what's available,
            and then, have fun!
          </p>
          <br></br>
          <br></br>
          </div>
          <div className='divider'>
            <br></br>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        <div className='query-descriptions'>
          <Link to="StreamsOverTime">
            <button className='query-descriptions-left'>
              Streams Over Time
            </button>
          </Link>

          <p className='query-descriptions-right'>
            Ever wanted to see when a song went viral?
            Here, you can select a song and see how many streams
            it's had over time.
          </p>
        </div>

        <div className='query-descriptions'>
          <Link to="RegionsRadio">
            <button className='query-descriptions-left' style={{backgroundColor: "#DFFFFF"}}>
              Region's Radio
            </button>
          </Link>

          <p className='query-descriptions-right'>
            What do they listen to over there?  Find out here!
          </p>
        </div>

        <div className='query-descriptions'>
          <Link to="SoundOfTime">
            <button className='query-descriptions-left' style={{backgroundColor: "#DAC0B9"}}>
              Sound of Time
            </button>
          </Link>

          <p className='query-descriptions-right'>
            The popularity of popular music!  See the time periods where music
            was (or wasn't) being released.
          </p>
        </div>

        <div className='query-descriptions'>
          <Link to="StylisticChanges">
            <button className='query-descriptions-left' style={{backgroundColor: "#EC896E"}}>
              Stylistic Changes
            </button>
          </Link>

          <p className='query-descriptions-right'>
            What would music be if it all sounded the same?  See how your favorite
            artists changed their signarutre sounds over time.
          </p>
        </div>

        <div className='query-descriptions'>
          <Link to="PopularElements">
            <button className='query-descriptions-left' style={{backgroundColor: "#FF673F"}}>
              Popular Elements
            </button>
          </Link>

          <p className='query-descriptions-right'>
            Here at Aura, we have 4 descriptors for the sounds of music.  Come 
            see how the popularities of these categories changes over time!
          </p>
        </div>


        

       </div>

    );
}

export default Queries;