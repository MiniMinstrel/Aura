const express = require('express')
const oracledb = require('oracledb');
const app = express();
const port = 8000;
require("dotenv").config();
var password = process.env.PASSWORD;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

async function selectFiveArtists(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "jscharff",
      password: password,
      connectString: "oracle.cise.ufl.edu/orcl"
    });
    
    // run query to get all employees
    result = await connection.execute(
    	`SELECT ARTIST_NAME 
    	 FROM ARTIST
    	 WHERE POPULARITY > 90
    	 ORDER BY POPULARITY ASC
    	 FETCH FIRST 5 ROWS ONLY`);

  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('query send no rows');
    } else {
      //send all employees
      return res.send(result.rows);
    }

  }
}

//get /employess
app.get('/artists', function (req, res) {
  selectFiveArtists(req, res);
})

async function selectArtistByID(req, res, id) {
  try {
    connection = await oracledb.getConnection({
      user: "jscharff",
      password: password,
      connectString: "oracle.cise.ufl.edu/orcl"
    });
    // run query to get employee with employee_id
    result = await connection.execute(
    	`SELECT ARTIST_NAME 
    	 FROM ARTIST 
    	 WHERE ARTIST_ID=:id`, [id]);

  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close(); 
      } catch (err) {
        return console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('query send no rows');
    } else {
      //send all employees
      return res.json(result.rows);
    }
  }
}

//get /employee?id=<id employee>
app.get('/artist', function (req, res) {
  //get query param ?id
  let id = req.query.id;
  // id param if it is number
  console.log("Searching with ID " + id);
  selectArtistByID(req, res, id);
})

async function selectArtistByGenre(req, res, param) {
  try {
    connection = await oracledb.getConnection({
      user: "jscharff",
      password: password,
      connectString: "oracle.cise.ufl.edu/orcl"
    });

    console.log(param);
    // run query to get employee with employee_id
    result = await connection.execute(
      `SELECT ARTIST_NAME, POPULARITY
       FROM ARTIST
       WHERE CONTAINS(GENRES, :param) > 0
       ORDER BY POPULARITY DESC
       FETCH FIRST 5 ROWS ONLY`, {param: param});

    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('query send no rows');
    } else {
      //send all employees
      return res.json(result.rows);
    }

  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close(); 
      } catch (err) {
        return console.error(err.message);
      }
    }
  }
}

//get /employee?id=<id employee>
app.post('/testQuery', function (req, res) {
  //get query param ?id
  let param = req.query.genre;
  // id param if it is number
  selectArtistByGenre(req, res, param);
})

async function countAllTuples(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "jscharff",
      password: password,
      connectString: "oracle.cise.ufl.edu/orcl"
    });
    // run query to get employee with employee_id
    result = await connection.execute(
      `SELECT COUNT(*)
       FROM SONG`);

    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('query send no rows');
    } else {
      //send all employees
      return res.json(result.rows);
    }

  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close(); 
      } catch (err) {
        return console.error(err.message);
      }
    }
  }
}

app.post('/allTuples', function (req, res) {
  countAllTuples(req, res);
})

async function STOT(req, res, song, date1, date2) {
  try {
    connection = await oracledb.getConnection({
      user: "jscharff",
      password: password,
      connectString: "oracle.cise.ufl.edu/orcl"
    });

    // run query to get employee with employee_id
    result = await connection.execute(
      `SELECT TO_CHAR(chart.chartdate, 'YYYY-MM') AS year_mo, avg(streamsum)
       FROM jscharff.chart
       RIGHT JOIN (SELECT sum(contains.streams) AS streamsum, contains.chart_id
          FROM jscharff.contains, jscharff.song
          WHERE song.song_name = :song
          GROUP BY contains.chart_id)
          ON chart.chartid = chart_id
       WHERE
          streamsum IS NOT NULL
       AND chart.chartdate BETWEEN
          TO_DATE(:date1,'YYYY-MM-DD')
          AND  TO_DATE(:date2,'YYYY-MM-DD')
       GROUP BY TO_CHAR(chart.chartdate, 'YYYY-MM')
       ORDER BY TO_CHAR(chart.chartdate, 'YYYY-MM') DESC`, {song: song, date1: date1, date2: date2});

    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('query send no rows');
    } else {
      //send all employees
      return res.json(result.rows);
    }

  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close(); 
      } catch (err) {
        return console.error(err.message);
      }
    }
  }
}

app.post('/STOT', function (req, res) {
  console.log(req.body);
  const song = req.body.song;
  const date1 = req.body.timeA;
  const date2 = req.body.timeB;
  //const artist = req.body.artist;
  STOT(req, res, song, date1, date2);
})

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

app.listen(port, () => console.log("nodeOracleRestApi app listening on port %s!", port))