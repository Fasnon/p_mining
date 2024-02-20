import "../assets/styles/Dashboard.css";
import React, { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Box,
  getListItemSecondaryActionClassesUtilityClass,
} from "@mui/material";
import dayjs from "dayjs";
import { getData } from "../server/filereadserver";

export const findDateRange = (data) => {
  let earliestDate = null;
  let latestDate = null;

  data.forEach((item) => {
    item.transactions.forEach((transaction) => {
      const creationDate = dayjs(transaction.creationDate);

      if (!earliestDate || creationDate.isBefore(earliestDate)) {
        earliestDate = creationDate;
      }

      if (!latestDate || creationDate.isAfter(latestDate)) {
        latestDate = creationDate;
      }
    });
  });

  return [earliestDate, latestDate];
};

const DatePickerComponent = ({ onDateChange }) => {
  const [earliestDate, setEarliestDate] = useState(null);
  const [latestDate, setLatestDate] = useState(null);

  const fetchDates = async () => {
    let earliest = dayjs("2023-12-01");
    let latest = dayjs("2024-01-01");
    // const response = await fetch("http://localhost:5000/api/data");

    const jsonData = getData();
    if (jsonData) {
      [earliest, latest] = findDateRange(jsonData);
    }
    setEarliestDate(earliest);
    setLatestDate(latest);
  };

  useEffect(() => {
    fetchDates(); // init fetch
  }, []);

  const handleDateChange = (newDate, isEarliest) => {
    const updatedEarliest = isEarliest ? newDate : earliestDate;
    const updatedLatest = isEarliest ? latestDate : newDate;

    setEarliestDate(updatedEarliest);
    setLatestDate(updatedLatest);

    // Notify the parent component about the new date range
    onDateChange([updatedEarliest, updatedLatest]);
    console.log("New Date Range:", [updatedEarliest, updatedLatest]);
  };

  const setData = async (timeframe) => {
    let earliest = dayjs("2023-12-01");
    let latest = dayjs("2024-01-01");
    // const response = await fetch("http://localhost:5000/api/data");

    const jsonData = getData();
    if (jsonData) {
      [earliest, latest] = findDateRange(jsonData);
    }

    if (timeframe === "AT") {
      onDateChange([earliest, latest]);
    } else {
      earliest = {
        "7D": dayjs(latest).subtract(7, "day"),
        "4W": dayjs(latest).subtract(4, "week"),
        "3M": dayjs(latest).subtract(3, "month"),
      }[timeframe];

      setEarliestDate(earliest);
      setLatestDate(latest);
      onDateChange([earliest, latest]);
    }
  };

  return (
    <>
      <div>
        <div className="Slider">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display="flex">
              <Box marginRight={4} sx={{ width: 0.28 }}>
                <div>Start Date</div>
                <DatePicker
                  slotProps={{ textField: { size: "small" } }}
                  value={earliestDate}
                  onChange={(date) => handleDateChange(date, true)}
                  format="DD-MM-YYYY"
                />
              </Box>
              <Box sx={{ width: 0.28 }}>
                <div>End Date</div>
                <DatePicker
                  slotProps={{ textField: { size: "small" } }}
                  value={latestDate}
                  onChange={(date) => handleDateChange(date, false)}
                  format="DD-MM-YYYY"
                />
              </Box>
            </Box>
          </LocalizationProvider>
        </div>
        <div className="QuickClicks">
          <p>
            <a onClick={() => setData("AT")} href="#">
              All Time
            </a>{" "}
            |{" "}
            <a onClick={() => setData("7D")} href="#">
              7 Days
            </a>{" "}
            |{" "}
            <a href="#" onClick={() => setData("4W")}>
              4 Weeks
            </a>{" "}
            |{" "}
            <a href="#" onClick={() => setData("3M")}>
              3 Months
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default DatePickerComponent;
