import "../assets/styles/Equities.css";
import DatePickerComponent from "../components/DatePickerComponent";

import { useEffect } from "react";

import { useState } from "react";

import { findDateRange } from "../components/DatePickerComponent";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import OverviewReport from "./OverviewReport";
import KeyMetricsReport from "./KeyMetricsReport";
import WorkflowReport from "./WorkflowReport";
import IndividualLookUpReport from "./IndividualLookUpReport";

const Overview = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // const [jsonData, setJsonData] = useState("");

  const [zoomLevel, setZoomLevel] = useState(1);

  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);

  // useEffect(() => {
    // const initFetch = async () => {
    //   const response = await fetch("http://localhost:5000/api/data");
    //   const jsonData = await response.json();
    //   console.log("ss");
    //   console.log(jsonData);
    //   setJsonData(jsonData);
    //   const dates = findDateRange(jsonData);
    //   setStartDate(dates[0]);
    //   setEndDate(dates[1]);
    // };
    // initFetch();
  // }, []);

  // const handleDateChange = async (newDates) => {
  //   setStartDate(newDates[0]);
  //   setEndDate(newDates[1]);
  // };

  function zoomIn() {
    setZoomLevel(zoomLevel + 0.1);
    console.log("zommo");
    console.log(zoomLevel);
  }

  function zoomOut() {
    setZoomLevel(zoomLevel - 0.1);
  }

  return (
    <>
      <header className="Dashboard-header">
        <h3>Process Mining Dashboard</h3>
        <p>From IS-Innovation</p>
      </header>

      <div className="BackToHome">
        <a href="/">
          <img
            className="BackToHomeIcon"
            alt="Back"
            src="/images/back_to_home.svg"
          />
          <div className="BackToHomeText">Back to home</div>
        </a>
      </div>
      <div className="PageName">Equities Overview</div>

      <div className="DatePickerContainer">
        <DatePickerComponent
          // jsonData={jsonData}
          // onDateChange={handleDateChange}
        />
      </div>
      <div className="container">
        <div className="side">
          <div
            className="sideContent"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin:
                zoomLevel < 1
                  ? "center 0"
                  : `0% ${((1 - zoomLevel) / 2) * 100}%`, // Conditionally set transformOrigin
            }}
          >
            {
              {
                0: <OverviewReport />,
                1: <WorkflowReport />,
                2: <KeyMetricsReport />,
                3: <IndividualLookUpReport />,
              }[activeIndex]
            }
          </div>
        </div>
        <div className="sidebar">
          <p>Report Sections</p>

          <Tabs
            aria-label="tabs"
            defaultValue={0}
            sx={{ bgcolor: "transparent" }}
            orientation="vertical"
            onChange={(event, newValue) => setActiveIndex(newValue)}
          >
            <TabList
              disableUnderline
              sx={{
                p: 0.5,
                gap: 0.5,
                padding: 1,
                borderRadius: "xl",
                bgcolor: "#ffffff",
                width: "70%",
                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                  boxShadow: "sm",
                  bgcolor: "#DFE8E7",
                },
              }}
            >
              <Tab disableIndicator>Overview</Tab>
              <Tab disableIndicator>Workflow</Tab>
              <Tab disableIndicator>Key Metrics</Tab>
              <Tab disableIndicator>Individual Look-up</Tab>
            </TabList>
          </Tabs>

          <button className="zoomIn" onClick={zoomIn}>
            ➕ Zoom In
          </button>
          <button className="zoomOut" onClick={zoomOut}>
            ➖ Zoom Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Overview;
