// DatePickerComponent.js
import "../assets/styles/Dashboard.css";
import React, { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Box } from '@mui/material';
import dayjs from 'dayjs';

const DatePickerComponent = ({ jsonData }) => {
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
  
    return (
        <div className="Slider">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display="flex" >
              <Box marginRight={4} sx={{ width: 0.28}}>
                <div>
                  Start Date
                </div>
                <DatePicker slotProps={{ textField: { size: 'small' } }}
                  value={earliestDate}
                  onChange={(date) => setEarliestDate(date)}
                />
              </Box>
              <Box sx={{  width: 0.28 }}>
                <div>
                  End Date
                </div>
                <DatePicker slotProps={{ textField: { size: 'small' } }}
                  value={latestDate}
                  onChange={(date) => setLatestDate(date)}
                />
              </Box>
            </Box>
          </LocalizationProvider>
        </div>
      );
    };
    
    export default DatePickerComponent;
    