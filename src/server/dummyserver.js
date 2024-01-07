const express = require("express");
const cors = require("cors");
const dayjs = require("dayjs");
const app = express();
const port = 5000;

app.use(cors());

// Serve static JSON file
function getData({ sDate, eDate }) {
  const data = require("./data/STP_Data.json");
  console.log(sDate);
  console.log(eDate);
  var filteredData;
  filteredData = data;
  if (sDate) {
    filteredData = filteredData.filter(
      (data) => Date.parse(data.startDate) > dayjs(sDate),
    );
  }
  if (eDate) {
    filteredData = filteredData.filter(
      (data) =>
        Date.parse(data.transactions.slice(-1)[0].changeDate) <
        dayjs(eDate) + 24 * 3600 * 1000,
    );
  }
  return filteredData;
}

app.get("/api/data", (req, res) => {
  const { sDate, eDate } = req.query;

  const data = getData({ sDate: sDate, eDate: eDate });
  console.log(data);
  res.json(data);
});

app.get("/api/counts", (req, res) => {
  const { sDate, eDate } = req.query;

  const data = getData({ sDate: sDate, eDate: eDate });

  STP_count = data.filter((data) => data.stpStatus == "yes").length;
  nonSTP_count = data.filter((data) => data.stpStatus == "no").length;
  total_count = data.length;
  res.json({
    STP_count: STP_count,
    nonSTP_count: nonSTP_count,
    total_count: total_count,
  });
});

app.get("/api/throughputtime", (req, res) => {
  const { sDate, eDate } = req.query;
  const data = getData({ sDate: sDate, eDate: eDate });
  const sum = Object.values(data).reduce(
    (acc, current) =>
      acc +
      (Date.parse(current.transactions.slice(-1)[0].changeDate) -
        Date.parse(current.startDate)) /
        (1000 * 3600 * 24),
    0,
  );
  const average = sum / Object.values(data).length;
  const LessTwoDays = data.filter(
    (data) =>
      Date.parse(data.transactions.slice(-1)[0].changeDate) -
        Date.parse(data.startDate) <=
      2 * 1000 * 3600 * 24,
  ).length;
  const LessThreeDays = data.filter(
    (data) =>
      Date.parse(data.transactions.slice(-1)[0].changeDate) -
        Date.parse(data.startDate) <=
      3 * 1000 * 3600 * 24,
  ).length;

  res.json({
    MeanThroughputTime: average,
    LessTwoDays: LessTwoDays,
    LessThreeDays: LessThreeDays,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
