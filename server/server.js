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
       FROM brienboudreau.charts`);

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
      `SELECT TO_CHAR(charts.chart_date, 'YYYY-MM') AS year_mo, avg(charts.streams)
       FROM brienboudreau.charts
        INNER JOIN (
          SELECT song.song_id, song.song_name FROM jscharff.song
          WHERE song.song_name = :song
          )
        ON charts.entry_id = song_id
       WHERE charts.streams IS NOT NULL AND charts.chart_date BETWEEN
        TO_DATE(:date1,'YYYY-MM-DD') AND TO_DATE(:date2,'YYYY-MM-DD')
       GROUP BY TO_CHAR(charts.chart_date, 'YYYY-MM')
       ORDER BY TO_CHAR(charts.chart_date, 'YYYY-MM')
`, {song: song, date1: date1, date2: date2});

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

async function RR(req, res, region, genre, date1, date2) {
  try {
    connection = await oracledb.getConnection({
      user: "jscharff",
      password: password,
      connectString: "oracle.cise.ufl.edu/orcl"
    });

    // run query to get employee with employee_id
    console.log("Testing query!");
    result = await connection.execute(
      `SELECT TO_CHAR(charts.chart_date, 'YYYY-MM') AS year_mo, count(charts.chart)
       FROM brienboudreau.charts
        INNER JOIN jscharff.made_by ON entry_id = made_by.song_id
        INNER JOIN jscharff.artist ON CONTAINS(made_by.artist_id, artist.artist_id) > 0
       WHERE CONTAINS(artist.genres, :genre) > 0 AND region = :region 
       AND chart_date BETWEEN
        TO_DATE(:date1,'YYYY-MM-DD') AND TO_DATE(:date2,'YYYY-MM-DD')
       GROUP BY TO_CHAR(charts.chart_date, 'YYYY-MM')
       ORDER BY year_mo ASC`, 
      {region: region, genre: genre, date1: date1, date2: date2});
    console.log("Completed query!");

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

app.post('/RR', function (req, res) {
  console.log(req.body);
  const region = req.body.region;
  const genre = req.body.genre;
  const date1 = req.body.timeA;
  const date2 = req.body.timeB;
  //const artist = req.body.artist;
  RR(req, res, region, genre, date1, date2);
})

async function SOT(req, res, genre, date1, date2) {
  try {
    connection = await oracledb.getConnection({
      user: "jscharff",
      password: password,
      connectString: "oracle.cise.ufl.edu/orcl"
    });

    // run query to get employee with employee_id
    console.log("Testing query!");
    if (genre == 'All') {
      result = await connection.execute(
      `SELECT TO_CHAR(song.release_date, 'YYYY-MM'), count(*)
       FROM JSCHARFF.song
       WHERE song.release_date 
        BETWEEN
        TO_DATE(:date1,'YYYY-MM-DD') AND TO_DATE(:date2,'YYYY-MM-DD')
       GROUP BY TO_CHAR(song.release_date, 'YYYY-MM')
       ORDER BY TO_CHAR(song.release_date, 'YYYY-MM') ASC`, 
      {date1: date1, date2: date2});
    } else {
      result = await connection.execute(
      `SELECT TO_CHAR(song.release_date, 'YYYY-MM'), count(*)
       FROM JSCHARFF.song
        NATURAL JOIN JSCHARFF.made_by
        INNER JOIN JSCHARFF.artist ON CONTAINS(made_by.artist_id, artist.artist_id) > 0
       WHERE song.release_date BETWEEN
        TO_DATE(:date1,'YYYY-MM-DD') AND TO_DATE(:date2,'YYYY-MM-DD') 
       AND CONTAINS(artist.genres, :genre) > 0
       GROUP BY TO_CHAR(song.release_date, 'YYYY-MM')
       ORDER BY TO_CHAR(song.release_date, 'YYYY-MM') ASC`, 
      {genre: genre, date1: date1, date2: date2});
    }
    console.log("Completed query!");

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

app.post('/SOT', function (req, res) {
  console.log(req.body);
  const genre = req.body.genre;
  const date1 = req.body.timeA;
  const date2 = req.body.timeB;
  //const artist = req.body.artist;
  SOT(req, res, genre, date1, date2);
})

async function STYCH(req, res, AuraValue, artist, date1, date2) {
  try {
    connection = await oracledb.getConnection({
      user: "jscharff",
      password: password,
      connectString: "oracle.cise.ufl.edu/orcl"
    });

    // run query to get employee with employee_id
    console.log("Testing query!");
    result = await connection.execute(
      `SELECT TO_CHAR(song.release_date, 'YYYY-MM') AS year_mo, avg(song.${AuraValue})
       FROM jscharff.song 
        NATURAL JOIN jscharff.made_by
        INNER JOIN jscharff.artist ON made_by.artist_id LIKE '%'''||artist.artist_id||'''%'
       WHERE artist.artist_name = :artist AND song.release_date BETWEEN
        TO_DATE(:date1,'YYYY-MM-DD') AND TO_DATE(:date2,'YYYY-MM-DD')
       GROUP BY TO_CHAR(song.release_date, 'YYYY-MM')
       ORDER BY TO_CHAR(song.release_date, 'YYYY-MM') ASC`, 
      {artist: artist, date1: date1, date2: date2});
    console.log("Completed query!");

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

app.post('/STYCH', function (req, res) {
  console.log(req.body);
  const AuraValue = req.body.AuraValue;
  const artist = req.body.artist;
  const date1 = req.body.timeA;
  const date2 = req.body.timeB;
  //const artist = req.body.artist;
  STYCH(req, res, AuraValue, artist, date1, date2);
})

async function PE(req, res, params, date1, date2) {
  try {
    connection = await oracledb.getConnection({
      user: "jscharff",
      password: password,
      connectString: "oracle.cise.ufl.edu/orcl"
    });

    // run query to get employee with employee_id
    console.log("Testing query!");
    result = await connection.execute(
      `SELECT TO_CHAR(song.release_date, 'YYYY-MM') AS year_mo, avg(song.popularity) AS popularity
       FROM jscharff.song
       WHERE song.danceability >= :p1
        AND song.danceability <= :p2
        AND song.energy >= :p3
        AND song.energy <= :p4
        AND song.release_date BETWEEN
          TO_DATE(:date1,'YYYY-MM-DD') AND TO_DATE(:date2,'YYYY-MM-DD')
       GROUP BY TO_CHAR(song.release_date, 'YYYY-MM')
       ORDER BY TO_CHAR(song.release_date, 'YYYY-MM') ASC`, 
      {p1: params[0], p2: params[1], p3: params[2], p4: params[3], date1: date1, date2: date2});
    console.log("Completed query!");

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

app.post('/PE', function (req, res) {
  console.log(req.body);
  const params = req.body.params;
  const date1 = req.body.timeA;
  const date2 = req.body.timeB;
  //const artist = req.body.artist;
  PE(req, res, params, date1, date2);
})

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

app.listen(port, () => console.log("nodeOracleRestApi app listening on port %s!", port))