const express = require('express')
const oracledb = require('oracledb');
const app = express();
const port = 8000;
var password = "py3efCwxfT8DBjogR4mYxQ6k";

async function selectFiveArtists(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "jscharff",
      password: password,
      connectString: "oracle.cise.ufl.edu/orcl"
    });

    console.log('connected to database');
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
        console.log('close connection success');
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

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

app.listen(port, () => console.log("nodeOracleRestApi app listening on port %s!", port))