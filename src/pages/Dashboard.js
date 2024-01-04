import "../assets/styles/App.css";
import "../assets/styles/Dashboard.css";
import DashCard from "../components/DashCard";
import ProcessNode from "../components/ProcessNode";

import { getOpenAIResponse } from "../components/ChatGPT"
import React, { useCallback, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import DatePickerComponent from '../components/DatePickerComponent'; 
import { findDateRange } from "../components/DatePickerComponent";
import dayjs from "dayjs";

import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  MarkerType,
} from "reactflow";

import { Chart } from "react-google-charts";
import DonutChart from "../components/DonutChart";

import "reactflow/dist/style.css";

import { dummyedges as initialEdges, dummynodes as initialNodes } from "../components/ReactFlowElements";

const nodeTypes = { processNode: ProcessNode};

// function valuetext(value) {
//   return ``;
// }

// function valueLabelFormat(value) {
//   return "";
// }
// const response = await getOpenAIResponse()
const response = "hello, nice to meet you"

const Dashboard = () => {
  
  // const fetchData = async() => {

  //   console.log(jsonData)
  //   return jsonData
  // }
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [activeIndex, setActiveIndex] = useState(0);
  const [jsonData, setJsonData] = useState('');

  // const jsonData = require('../server/data/STP_Data.json');

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() =>{
    const initFetch = async() => {
      const response = await fetch('http://localhost:5000/api/data');
      const jsonData = await response.json();
  
      const data = require('../server/data/STP_Data.json');
      // console.log(data)
    
      setJsonData(jsonData);
      const [startD, endD] = findDateRange(jsonData)
      setStartDate(startD);
      console.log(startD)
      setEndDate(endD);
    }
    initFetch();
  }, []);



  // Callback function to update start and end dates
  const handleDateChange = async (newDates) => {
    setStartDate(newDates[0]);
    setEndDate(newDates[1]);

    
    const response = await fetch(`http://localhost:5000/api/data?sDate=${dayjs(newDates[0]).format('YYYY-MM-DD')}&eDate=${dayjs(newDates[1]).format('YYYY-MM-DD')}`);
    const jsonData = await response.json();

    console.log(jsonData.length)
    // await fetchData();
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  return (
    <>
      <header className="Dashboard-header">
        <h3>Process Mining Dashboard</h3>
      </header>
      <div className="BackToHome">
        <a href="/">
          <img className="BackToHomeIcon" alt="Back" src="/images/back_to_home.svg" />
          <div className="BackToHomeText">Back to home</div>
        </a>
      </div>
      <div className="PageName">Equities Overview</div>
      
      
      <div className="DatePickerContainer">
          <DatePickerComponent jsonData={jsonData} 
                  onDateChange ={handleDateChange}/>
          </div>
          
      <div className="CardBar">
        <DashCard
          title="Mean Throughput Time (Days)"
          contentpre="An additional "
          contentmain="40 cases"
          contentpost=" were processed within 2 days or less."
          numeric="1.82"
          nTrend="23.8%"
          trendPositive={true}
          trendIncreasing={false}
        />
        <DashCard
          title="STP Cases"
          contentpre="There were "
          contentmain = "29,120 cases between "
          contentpost={
            startDate
              ? `${dayjs(startDate).format('DD-MM-YYYY')} and ${dayjs(endDate).format('DD-MM-YYYY')} processed STP.`
              : 'Placeholder Text'
          }
          numeric="29%"
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
          numeric="220k"
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
                data={ activeIndex === 0?
                  [[
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
                ]:
                
                [[
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
                  width: '45vw',
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
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
            >
              <Controls position="top-right" />

              <Background variant="dots" gap={16} size={1.5} />
            </ReactFlow>
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
                  ["STP", 29],
                  ["Non-STP", 62],
                ]}
                title="STP Cases"
                colors={["#6AB451", "#D9D9D9"]}
                text="29/91"
              />
              <DonutChart
                data={[
                  ["Status", "Count"],
                  ["Longer than 3 days", 58],
                  ["Shorter than 3 days", 22],
                ]}
                title="Cases > 3 Days"
                colors={["#C95D61", "#D9D9D9"]}
                text="58/80"
              />
            </div>
            <div className="ReportToCFO">
              <span className="ReportToCFOTitle">Quick Summary</span>
              <br/>
              <br/>
            In the recent performance metrics analysis, we observed significant changes across four key indicators. First, the Mean Throughput Time (Days) experienced a notable improvement as an additional 40 cases were processed within a swift timeframe of 2 days or less, resulting in a 23.8% decrease, reflecting enhanced efficiency in processing times. However, the STP Cases metric showed a contrasting trend with 29 more cases being processed through Straight Through Processing (STP) this week, but it marked a considerable 71.2% decrease. This discrepancy may warrant further investigation to understand the underlying factors influencing the STP process. On a positive note, the metric for Additional Manual Actions revealed a 25% decrease, indicating a reduction in the need for manual interventions in case processing, although this saw a slight uptick of 14.0%. Finally, Trade Volume experienced a substantial decline with 24,639 fewer cases processed this week, translating to a significant 41.2% decrease, reflecting a noteworthy shift in overall workload. These metrics collectively provide valuable insights into process efficiency, STP effectiveness, manual intervention requirements, and overall workload management, allowing us to make informed decisions to optimize our operational processes further.
            AI response: {response}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
