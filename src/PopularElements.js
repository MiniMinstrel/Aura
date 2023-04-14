import { Link } from 'react-router-dom';

const PopularElements = () => {
    return (
      <div>
        <h1>Popular Elements</h1>
        <ul>
          <li><Link to="/Queries">Back</Link></li>
        </ul>
      </div>
    );
}

export default PopularElements;