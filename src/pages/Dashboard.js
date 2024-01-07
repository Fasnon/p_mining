import "../assets/styles/App.css";
import "../assets/styles/Dashboard.css";
import DashCard from "../components/DashCard";
import ProcessNode from "../components/ProcessNode";

import { getOpenAIResponse } from "../utils/ChatGPT";
import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import DatePickerComponent from "../components/DatePickerComponent";
import { findDateRange } from "../components/DatePickerComponent";
import dayjs from "dayjs";

import { Chart } from "react-google-charts";
import DonutChart from "../components/DonutChart";

import "reactflow/dist/style.css";

import IdealWorkFlow from "../components/IdealWorkFlow";

const nodeTypes = { processNode: ProcessNode };

// function valuetext(value) {
//   return ``;
// }

// function valueLabelFormat(value) {
//   return "";
// }
// const response = await getOpenAIResponse()
const response = "hello, nice to meet you";

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [jsonData, setJsonData] = useState("");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [STP_count, setSTP_count] = useState(0);
  const [nonSTP_count, setNonSTP_count] = useState(0);
  const [total_count, setTotal_count] = useState(0);

  const [meanThroughputTime, setMeanThroughputTime] = useState(null);
  const [LessTwoDays_count, setLessTwoDays_count] = useState(null);
  const [LessThreeDays_count, setLessThreeDays_count] = useState(null);

  useEffect(() => {
    const initFetch = async () => {
      const response = await fetch("http://localhost:5000/api/data");
      const jsonData = await response.json();
      console.log("ss");
      console.log(jsonData);
      setJsonData(jsonData);

      const dates = findDateRange(jsonData);
      setStartDate(dates[0]);
      setEndDate(dates[1]);

      const countsResponse = await fetch("http://localhost:5000/api/counts");
      const counts = await countsResponse.json();

      setSTP_count(counts["STP_count"]);
      setNonSTP_count(counts["nonSTP_count"]);
      setTotal_count(counts["total_count"]);

      const throughputTimeResponse = await fetch(
        "http://localhost:5000/api/throughputtime",
      );
      const throughputTimes = await throughputTimeResponse.json();

      setMeanThroughputTime(throughputTimes["MeanThroughputTime"]);
      setLessTwoDays_count(throughputTimes["LessTwoDays"]);
      setLessThreeDays_count(throughputTimes["LessThreeDays"]);
    };
    initFetch();
  }, []);

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/data?sDate=${dayjs(startDate).format(
        "YYYY-MM-DD",
      )}&eDate=${dayjs(endDate).format("YYYY-MM-DD")}`,
    )
      .then((response) => response.json())
      .then((json) => {
        setJsonData(json);
      });
    fetch(
      `http://localhost:5000/api/counts?sDate=${dayjs(startDate).format(
        "YYYY-MM-DD",
      )}&eDate=${dayjs(endDate).format("YYYY-MM-DD")}`,
    )
      .then((response) => response.json())
      .then((json) => {
        setSTP_count(json["STP_count"]);
        setTotal_count(json["total_count"]);
        setNonSTP_count(json["nonSTP_count"]);
      });
    fetch(
      `http://localhost:5000/api/throughputtime?sDate=${dayjs(startDate).format(
        "YYYY-MM-DD",
      )}&eDate=${dayjs(endDate).format("YYYY-MM-DD")}`,
    )
      .then((response) => response.json())
      .then((json) => {
        setMeanThroughputTime(json["MeanThroughputTime"]);
        setLessTwoDays_count(json["LessTwoDays"]);
        setLessThreeDays_count(json["LessThreeDays"]);
      });
  }, [startDate, endDate]);

  // Callback function to update start and end dates
  const handleDateChange = async (newDates) => {
    setStartDate(newDates[0]);
    setEndDate(newDates[1]);
  };

  return (
    <>
      <header className="Dashboard-header">
        <h3>Process Mining Dashboard</h3>
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
          jsonData={jsonData}
          onDateChange={handleDateChange}
        />
      </div>

      <div className="CardBar">
        <DashCard
          title="Mean Throughput Time (Days)"
          contentpre="An additional "
          contentmain={
            LessTwoDays_count != undefined
              ? `${LessTwoDays_count} cases `
              : "Placeholder Text"
          }
          contentpost=" were processed within 2 days or less."
          numeric={
            meanThroughputTime != undefined
              ? meanThroughputTime < 0.1
                ? meanThroughputTime.toPrecision(2)
                : meanThroughputTime.toPrecision(3)
              : "-"
          }
          nTrend="23.8%"
          trendPositive={true}
          trendIncreasing={false}
        />
        <DashCard
          title="STP Cases"
          contentpre="There were "
          contentmain={
            STP_count != undefined
              ? `${STP_count} out of ${total_count} cases between `
              : "Placeholder Text"
          }
          contentpost={
            startDate
              ? `${dayjs(startDate).format("DD-MM-YYYY")} and ${dayjs(
                  endDate,
                ).format("DD-MM-YYYY")} processed STP.`
              : "Placeholder Text"
          }
          numeric={
            STP_count != undefined
              ? `${Math.round((STP_count / total_count) * 100)}%`
              : "Placeholder Text"
          }
          nTrend="71.2%"
          trendPositive={true}
          trendIncreasing={true}
        />
        <DashCard
          title="Additional Manual Actions"
          contentpre=""
          contentmain="12 more cases"
          contentpost=" had additional manual actions within their processing."
          numeric="25%"
          nTrend="14.0%"
          trendPositive={false}
          trendIncreasing={true}
        />
        <DashCard
          title="Trade Volume"
          contentpre=""
          contentmain="24,639 fewer cases"
          contentpost=" were processed this week."
          numeric={total_count ? `${total_count}` : "0"}
          nTrend="41.2%"
          trendPositive={false}
          trendIncreasing={false}
        />
      </div>

      <div className="MainContainer">
        <div className="LeftColumnContainer">
          <div className="ColumnHeader">Transactions over Time</div>
          <div className="HistoricalTrendBg">
            <div className="HistoricalTrendChart">
              <Chart
                chartType="AreaChart"
                data={
                  activeIndex === 0
                    ? [
                        [
                          "Week",
                          "STP",
                          "Non-STP",
                          {
                            sourceColumn: 0,
                            role: "annotation",
                            type: "string",
                            calc: "stringify",
                          },
                        ],
                        [
                          "29 Oct - 4 Nov",
                          32000,
                          19202,
                          Math.round((32000 / (32000 + 19202)) * 100) + "%",
                        ],
                        [
                          "5 Nov - 11 Nov",
                          68100,
                          9920,
                          Math.round((68100 / (68100 + 9920)) * 100) + "%",
                        ],
                        [
                          "12 Nov - 18 Nov",
                          29105,
                          44201,
                          Math.round((29105 / (29105 + 44201)) * 100) + "%",
                        ],
                        [
                          "19 Nov - 25 Nov",
                          14400,
                          39391,
                          Math.round((14400 / (14400 + 39391)) * 100) + "%",
                        ],
                      ]
                    : [
                        [
                          "Day",
                          "STP",
                          "Non-STP",
                          {
                            sourceColumn: 0,
                            role: "annotation",
                            type: "string",
                            calc: "stringify",
                          },
                        ],
                        [
                          "21 Nov",
                          5810,
                          9202,
                          Math.round((5810 / (5810 + 9202)) * 100) + "%",
                        ],
                        [
                          "22 Nov",
                          6800,
                          920,
                          Math.round((6800 / (6800 + 920)) * 100) + "%",
                        ],
                        [
                          "23 Nov",
                          1105,
                          4201,
                          Math.round((1105 / (1105 + 4201)) * 100) + "%",
                        ],
                        [
                          "24 Nov",
                          4400,
                          3991,
                          Math.round((4400 / (4400 + 3991)) * 100) + "%",
                        ],
                      ]
                }
                options={{
                  isStacked: true,

                  bar: { groupWidth: "30%" },
                  width: "45vw",
                  height: 300,
                  backgroundColor: { fill: "transparent" },
                  pieSliceText: "none",

                  titleTextStyle: {
                    color: "#000000",
                    fontName: "IBM Plex Mono",
                    fontSize: 14,
                    bold: false,
                    italic: false,
                  },
                  colors: ["#6AB451", "#C95D61"],
                  is3D: false,
                }}
              />
            </div>
          </div>

          <div className="ColumnHeader">Ideal Workflow Overview</div>

          <div className="ReactFlowBg">
            <IdealWorkFlow data={jsonData} />
          </div>
        </div>

        <div className="RightColumnContainer">
          <div className="ColumnHeader">Key Metrics</div>
          <div className="ReactFlowBg">
            <div className="ChartBar">
              <DonutChart
                data={[
                  ["Status", "Count"],
                  ["yes", 9],
                  ["no", 7],
                  ["maybe", 6],
                  ["perhaps", 5],
                  ["aa", 3],
                  ["other", 8],
                ]}
                title="Variant Counts"
                colors={[
                  "#729AC2",
                  "#DF8B5B",
                  "#68B279",
                  "#C95D61",
                  "#897BB8",
                  "#D9D9D9",
                ]}
                text="14"
              />
              <DonutChart
                data={[
                  ["Status", "Count"],
                  ["STP", STP_count],
                  ["Non-STP", nonSTP_count],
                ]}
                title="STP Cases"
                colors={["#6AB451", "#D9D9D9"]}
                text={STP_count + "/" + total_count}
              />
              <DonutChart
                data={[
                  ["Status", "Count"],
                  ["Longer than 3 days", total_count - LessThreeDays_count],
                  ["Shorter than 3 days", LessThreeDays_count],
                ]}
                title="Cases > 3 Days"
                colors={["#C95D61", "#D9D9D9"]}
                text={total_count - LessThreeDays_count + "/" + total_count}
              />
            </div>
            <div className="ReportToCFO">
              <span className="ReportToCFOTitle">Quick Summary</span>
              <br />
              <br />
              In the recent performance metrics analysis, we observed
              significant changes across four key indicators. First, the Mean
              Throughput Time (Days) experienced a notable improvement as an
              additional 40 cases were processed within a swift timeframe of 2
              days or less, resulting in a 23.8% decrease, reflecting enhanced
              efficiency in processing times. However, the STP Cases metric
              showed a contrasting trend with 29 more cases being processed
              through Straight Through Processing (STP) this week, but it marked
              a considerable 71.2% decrease. This discrepancy may warrant
              further investigation to understand the underlying factors
              influencing the STP process. On a positive note, the metric for
              Additional Manual Actions revealed a 25% decrease, indicating a
              reduction in the need for manual interventions in case processing,
              although this saw a slight uptick of 14.0%. Finally, Trade Volume
              experienced a substantial decline with 24,639 fewer cases
              processed this week, translating to a significant 41.2% decrease,
              reflecting a noteworthy shift in overall workload. These metrics
              collectively provide valuable insights into process efficiency,
              STP effectiveness, manual intervention requirements, and overall
              workload management, allowing us to make informed decisions to
              optimize our operational processes further. AI response:{" "}
              {response}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
