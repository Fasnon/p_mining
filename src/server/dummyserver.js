const express = require('express');
const app = express();
const port = 5000;

// Serve your static JSON file
app.get('/api/data', (req, res) => {
  const data = require('./data/STP_Data.json');
  const { startDate, endDate } = req.query;

  sDate = Date.parse(startDate);
  eDate = Date.parse(endDate);


  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});