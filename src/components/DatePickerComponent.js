import "../assets/styles/Dashboard.css";
import React, { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Box } from '@mui/material';
import dayjs from 'dayjs';
  
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


const DatePickerComponent = ({ jsonData, onDateChange }) => {
    const [earliestDate, setEarliestDate] = useState(null);
    const [latestDate, setLatestDate] = useState(null);
  
    useEffect(() => {
      let earliest = dayjs('2023-12-01');
      let latest =  dayjs('2024-01-01');
      if (jsonData){
        [earliest, latest]  = findDateRange(jsonData);
      }
      
      setEarliestDate(earliest);
      setLatestDate(latest);
    }, [jsonData]);

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
            <Box display="flex" >
              <Box marginRight={4} sx={{ width: 0.28}}>
                <div>
                  Start Date
                </div>
                <DatePicker slotProps={{ textField: { size: 'small' } }}
                  value={earliestDate}
                  onChange={(date) => handleDateChange(date, true)}
                  format="DD-MM-YYYY"
                />
              </Box>
              <Box sx={{  width: 0.28 }}>
                <div>
                  End Date
                </div>
                <DatePicker slotProps={{ textField: { size: 'small' } }}
                  value={latestDate}
                  onChange={(date) => handleDateChange(date, false)}
                  format="DD-MM-YYYY"
                />
              </Box>
            </Box>
          </LocalizationProvider>
        </div>
      );
    };
    
    export default DatePickerComponent;