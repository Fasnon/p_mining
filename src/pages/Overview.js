import "../assets/styles/Equities.css";
import DatePickerComponent from "../components/DatePickerComponent";

import { useEffect, useState } from "react";

import { findDateRange } from "../components/DatePickerComponent";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import OverviewReport from "./OverviewReport";
import KeyMetricsReport from "./KeyMetricsReport";
import WorkflowReport from "./WorkflowReport";
import IndividualLookUpReport from "./IndividualLookUpReport";
import { getData } from "../server/filereadserver";
import {
  getInformationOnTranscation,
  prettifyName,
} from "../utils/GetInformationOnTransaction";

const Overview = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [jsonData, setJsonData] = useState("");

  const [zoomLevel, setZoomLevel] = useState(1);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [mouseOverStep, setMouseOverStep] = useState(null);
  const [edgeSelectionTitle, setEdgeSelectionTitle] = useState(null);
  const [edgeSelectionBody, setEdgeSelectionBody] = useState(null);

  useEffect(() => {
    const initFetch = async () => {
      // const response = await fetch("http://localhost:5000/api/data");
      const jsonData = getData();
      console.log(jsonData);
      setJsonData(jsonData);
      const dates = findDateRange(jsonData);
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    };
    initFetch();
  }, []);

  useEffect(() => {
    setJsonData(getData({ sDate: startDate, eDate: endDate }));
  }, [startDate, endDate]);

  const handleDateChange = async (newDates) => {
    setStartDate(newDates[0]);
    setEndDate(newDates[1]);
    setJsonData(getData({ sDate: newDates[0], eDate: newDates[1] }));
  };

  const selectedStepChange = async (newStep) => {
    setMouseOverStep(newStep);
    console.log(newStep + "logged in overview");
  };

  const edgeSelection = async (edgeSelectionTitle, edgeSelectionBody) => {
    setEdgeSelectionBody(edgeSelectionBody)
    setEdgeSelectionTitle(edgeSelectionTitle)
  };

  function zoomIn() {
    setZoomLevel(zoomLevel + 0.1);
    console.log(zoomLevel);
  }

  function zoomOut() {
    if (zoomLevel >= 0.3) {
    setZoomLevel(zoomLevel - 0.1);
    }
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
            src="images/back_to_home.svg"
          />
          <div className="BackToHomeText">Back to home</div>
        </a>
      </div>
      <div className="PageName">Equities Overview</div>

      <div className="DatePickerContainer">
        <DatePickerComponent
          jsonData={jsonData}
          onDateChange={handleDateChange}
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
                0: <OverviewReport startDate={startDate} endDate={endDate} />,
                1: (
                  <WorkflowReport
                    startDate={startDate}
                    endDate={endDate}
                    data={jsonData}
                    onMouseOverChange={selectedStepChange}
                  />
                ),
                2: <KeyMetricsReport startDate={startDate} endDate={endDate} />,
                3: (
                  <IndividualLookUpReport
                    startDate={startDate}
                    endDate={endDate}
                    onMouseOverChange={selectedStepChange}
                    onEdgeSelection={edgeSelection}
                  />
                ),
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

{mouseOverStep ? (
  <>
    <div className="flowchart-hover">
      <img alt="Info" src="images/flowchart-info.svg" />
      <p>{prettifyName(mouseOverStep)}</p>
    </div>
    <div className="flowchart-hover-body">
      {getInformationOnTranscation(mouseOverStep)}
    </div>
  </>
) : (
  <> </>
)}

{edgeSelectionTitle ? (
  <>
    <div className="flowchart-hover">
      <img alt="Info" src="images/flowchart-info.svg" />
      <p>{edgeSelectionTitle}</p>
    </div>
    <div className="flowchart-hover-body">
      {edgeSelectionBody}
    </div>
  </>
) : (
  <> </>
)}
        </div>
      </div>
    </>
  );
};

export default Overview;
