const express = require('express');
const app = express();
const port = 3001;
const unirest = require("unirest");

//app.get('/api/associations/:page/:per_page', (req, res) => {
app.get('/api/players/:page/:per_page', (req, res) => {
  const request = unirest("GET", "https://free-nba.p.rapidapi.com/players");
  //request.query({ "entry": req.params.word });
  request.query({
	//"page": "0",
	"page": req.params.page,
	//"per_page": "25"
	"per_page": req.params.per_page,
  });
  request.headers({
    "x-rapidapi-host": "free-nba.p.rapidapi.com",
	"x-rapidapi-key": "241c235d5bmshb3fd1d3976be070p1006e8jsn3b2a01dcaebd",
	"useQueryString": true
  });

  request.end(function (response) {
    if (response.error) throw new Error(response.error);

    res.json(response.body.data || {});
  });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});