import "../assets/styles/App.css";
import "../assets/styles/Dashboard.css";
import DashCard from "../components/DashCard";
import ProcessNode from "../components/ProcessNode";
import React, { useCallback, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  MarkerType,
} from "reactflow";

import { Chart } from "react-google-charts";
import { Slider } from "@mui/material";

import "reactflow/dist/style.css";

const nodeTypes = { processNode: ProcessNode };

const marks = [
  {
    value: 0,
    label: '1 day',
  },
  {
    value: 1,
    label: '7 day',
  },
  {
    value: 2,
    label: '14 day',
  },
  {
    value: 3,
    label: '30 day',
  },
];

function valuetext(value) {
  return ``;
}

function valueLabelFormat(value) {
  return "";
}

const initialNodes = [
  {
    id: "1",
    type: "processNode",
    position: { x: 0, y: 0 },
    data: { label: "1", stepName: "Start", count: "34,232", stpRate: 0.19},
  },
  {
    id: "2",
    type: "processNode",
    position: { x: 0, y: 150 },
    data: { label: "2", stepName: "Entry", count: "34,232", stpRate: 0.90 },
  },
  {
    id: "3",
    type: "processNode",
    position: { x: 0, y: 300 },
    data: { label: "1", stepName: "Processing", count: "34,232", stpRate: 0.66 },
  },
  {
    id: "4",
    type: "processNode",
    position: { x: 0, y: 450 },
    data: { label: "2", stepName: "Pre-Check", count: "34,232", stpRate: 0.31 },
  },
  {
    id: "5",
    type: "processNode",
    position: { x: 0, y: 600 },
    data: { label: "2", stepName: "Settled", count: "34,232" , stpRate: 0.88},
  },
  {
    id: "6",
    type: "processNode",
    position: { x: 300, y: 600 },
    data: { label: "2", stepName: "Fin Calc", count: "34,232" , stpRate: 0.73},
  },
  {
    id: "7",
    type: "processNode",
    position: { x: 300, y: 450 },
    data: { label: "2", stepName: "Under Settlement", count: "34,232", stpRate: 0.2 },
  },
  {
    id: "8",
    type: "processNode",
    position: { x: 300, y: 300 },
    data: { label: "2", stepName: "Free Deal", count: "34,232" , stpRate: 0.12},
  },
  {
    id: "9",
    type: "processNode",
    position: { x: 300, y: 150 },
    data: { label: "2", stepName: "Confirmed", count: "34,232" },
  },
];
const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: "true",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: "true",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: "true",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    animated: "true",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    animated: "true",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e6-7",
    source: "6",
    target: "7",
    animated: "true",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e7-8",
    source: "7",
    target: "8",
    animated: "true",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e8-9",
    source: "8",
    target: "9",
    animated: "true",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

const Dashboard = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [activeIndex, setActiveIndex] = useState(0);

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
          contentpre=""
          contentmain="29 more cases"
          contentpost=" were processed STP this week."
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
          <div className="Slider">
            
            <Slider
              aria-label="Restricted values"
              defaultValue={0}
              valueLabelFormat={valueLabelFormat}
              getAriaValueText={valuetext}
              step={null}
              valueLabelDisplay="auto"
              marks={marks}
              max={3}
              onChange={ (e, val) => {
                console.log (e);
                console.log (val)
                if (activeIndex == 0){
                  setActiveIndex(1)
                }
                else{
                  setActiveIndex(0)

                }
              }}
            />
          
          </div>
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
              <div className="Chart">
                <Chart
                  chartType="PieChart"
                  data={[
                    ["Status", "Count"],
                    ["yes", 9],
                    ["no", 7],
                    ["maybe", 6],
                    ["perhaps", 5],
                    ["aa", 3],
                    ["other", 8],
                  ]}
                  options={{
                    title: "Variant Counts",
                    pieHole: 0.6,
                    width: 340,
                    height: 240,
                    backgroundColor: { fill: "transparent" },
                    legend: { position: "none" },
                    pieSliceText: "none",
                    colors: [
                      "#729AC2",
                      "#DF8B5B",
                      "#68B279",
                      "#C95D61",
                      "#897BB8",
                      "#D9D9D9",
                    ],

                    titleTextStyle: {
                      color: "#000000",
                      fontName: "IBM Plex Mono",
                      fontSize: 14,
                      bold: false,
                      italic: false,
                    },
                    is3D: false,
                  }}
                />
                <div className="ChartInsideText">14</div>
              </div>
              <div className="Chart">
                <Chart
                  chartType="PieChart"
                  data={[
                    ["Status", "Count"],
                    ["STP", 29],
                    ["Non-STP", 62],
                  ]}
                  options={{
                    title: "STP Cases",
                    pieHole: 0.6,
                    width: 340,
                    height: 240,
                    backgroundColor: { fill: "transparent" },
                    legend: { position: "none" },
                    pieSliceText: "none",

                    titleTextStyle: {
                      color: "#000000",
                      fontName: "IBM Plex Mono",
                      fontSize: 14,
                      bold: false,
                      italic: false,
                    },
                    colors: ["#6AB451", "#D9D9D9"],
                    is3D: false,
                  }}
                />
                <div className="ChartInsideText">29/91</div>
              </div>
              <div className="Chart">
                <Chart
                  chartType="PieChart"
                  data={[
                    ["Status", "Count"],
                    ["Longer than 3 days", 58],
                    ["Shorter than 3 days", 22],
                  ]}
                  options={{
                    title: "Cases > 3 Days",
                    pieHole: 0.6,
                    width: 340,
                    height: 240,
                    backgroundColor: { fill: "transparent" },
                    legend: { position: "none" },
                    pieSliceText: "none",

                    titleTextStyle: {
                      color: "#000000",
                      fontName: "IBM Plex Mono",
                      fontSize: 14,
                      bold: false,
                      italic: false,
                    },
                    colors: ["#C95D61", "#D9D9D9"],
                    is3D: false,
                  }}
                />
                <div className="ChartInsideText">58/80</div>
              </div>
            </div>
            <div className="ReportToCFO">
              <span className="ReportToCFOTitle">Quick Summary</span>
              <br/>
              <br/>
            In the recent performance metrics analysis, we observed significant changes across four key indicators. First, the Mean Throughput Time (Days) experienced a notable improvement as an additional 40 cases were processed within a swift timeframe of 2 days or less, resulting in a 23.8% decrease, reflecting enhanced efficiency in processing times. However, the STP Cases metric showed a contrasting trend with 29 more cases being processed through Straight Through Processing (STP) this week, but it marked a considerable 71.2% decrease. This discrepancy may warrant further investigation to understand the underlying factors influencing the STP process. On a positive note, the metric for Additional Manual Actions revealed a 25% decrease, indicating a reduction in the need for manual interventions in case processing, although this saw a slight uptick of 14.0%. Finally, Trade Volume experienced a substantial decline with 24,639 fewer cases processed this week, translating to a significant 41.2% decrease, reflecting a noteworthy shift in overall workload. These metrics collectively provide valuable insights into process efficiency, STP effectiveness, manual intervention requirements, and overall workload management, allowing us to make informed decisions to optimize our operational processes further.
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
