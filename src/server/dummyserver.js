const express = require('express');
const cors = require("cors");
const dayjs = require("dayjs");
const app = express();
const port = 5000;

app.use(cors());

// Serve your static JSON file
app.get('/api/data', (req, res) => {
  const data = require('./data/STP_Data.json');
  const { sDate, eDate } = req.query;
  
  if (sDate){
    
    const filteredData = data.filter(data => Date.parse(data.startDate) > dayjs(sDate));
    
    console.log()
    res.json(filteredData)
  }
  else{

    res.json(data);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});