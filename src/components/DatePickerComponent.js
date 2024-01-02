// DatePickerComponent.js
import "../assets/styles/Dashboard.css";
import React, { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Box } from '@mui/material';
import dayjs from 'dayjs';

const DatePickerComponent = ({ jsonData, onDateChange }) => {
    const [earliestDate, setEarliestDate] = useState(null);
    const [latestDate, setLatestDate] = useState(null);
  
    useEffect(() => {
      const { earliest, latest } = findDateRange(jsonData);
      setEarliestDate(earliest);
      setLatestDate(latest);
    }, [jsonData]);
  
    const findDateRange = (data) => {
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
  
      return { earliest: earliestDate, latest: latestDate };
    };

    const handleDateChange = (newDate, isEarliest) => {
      const updatedEarliest = isEarliest ? newDate : earliestDate;
      const updatedLatest = isEarliest ? latestDate : newDate;
  
      setEarliestDate(updatedEarliest);
      setLatestDate(updatedLatest);
  
      // Notify the parent component about the new date range
      onDateChange([updatedEarliest, updatedLatest]);
      console.log("New Date Range:", [updatedEarliest, updatedLatest]);
    };
  
    return (
        <div className="Slider">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display="flex">
              <Box marginRight={2}>
                <div>
                  Earliest Date:
                </div>
                <DatePicker
                  value={earliestDate}
                  onChange={(date) => handleDateChange(date, true)}
                />
              </Box>
              <Box>
                <div>
                  Latest Date:
                </div>
                <DatePicker
                  value={latestDate}
                  onChange={(date) => handleDateChange(date, false)}
                />
              </Box>
            </Box>
          </LocalizationProvider>
        </div>
      );
    };
    
    export default DatePickerComponent;
    