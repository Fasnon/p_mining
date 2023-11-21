import "../assets/styles/App.css";
import "../assets/styles/Dashboard.css";
import DashCard from "../components/DashCard";
import ProcessNode from "../components/ProcessNode";
import React, { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  MarkerType,
} from "reactflow";

import { Chart } from "react-google-charts";

import "reactflow/dist/style.css";

const nodeTypes = { processNode: ProcessNode };

const initialNodes = [
  {
    id: "1",
    type: "processNode",
    position: { x: 0, y: 0 },
    data: { label: "1", stepName: "Start", count: "34,232" },
  },
  {
    id: "2",
    type: "processNode",
    position: { x: 0, y: 150 },
    data: { label: "2" , stepName: "Entry", count: "34,232" },
  },
  {
    id: "3",
    type: "processNode",
    position: { x: 0, y: 300 },
    data: { label: "1", stepName: "Processing", count: "34,232" },
  },
  {
    id: "4",
    type: "processNode",
    position: { x: 0, y: 450 },
    data: { label: "2", stepName: "Pre-Check", count: "34,232" },
  },
  {
    id: "5",
    type: "processNode",
    position: { x: 0, y: 600 },
    data: { label: "2", stepName: "Settled", count: "34,232" },
  },
  {
    id: "6",
    type: "processNode",
    position: { x: 300, y: 600 },
    data: { label: "2", stepName: "Fin Calc", count: "34,232" },
  },
  {
    id: "7",
    type: "processNode",
    position: { x: 300, y: 450 },
    data: { label: "2", stepName: "Under Settlement", count: "34,232" },
  },
  {
    id: "8",
    type: "processNode",
    position: { x: 300, y: 300 },
    data: { label: "2", stepName: "Free Deal", count: "34,232" },
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

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  return (
    <div className="App">
      <header className="Dashboard-header">
        <h3>Process Mining Dashboard</h3>
      </header>
      <div className="CardBar">
        <DashCard
          title="Mean Days to Completion"
          contentpre="An additional "
          contentmain="40 cases"
          contentpost=" were processed within 2 days or less."
          numeric="1.82"
          nTrend="23.8%"
          trendPositive={true}
          trendIncreasing={false}
        />
        <DashCard
          title="Non-STP Cases"
          contentpre=""
          contentmain="29 fewer cases"
          contentpost=" were processed non-STP this week."
          numeric="29%"
          nTrend="71.2%"
          trendPositive={true}
          trendIncreasing={false}
        />
        <DashCard
          title="Self Loop Cases"
          contentpre=""
          contentmain="12 more cases"
          contentpost=" had a self-loop within their processing."
          numeric="25%"
          nTrend="14.0%"
          trendPositive={false}
          trendIncreasing={true}
        />
        <DashCard
          title="Self Loop Cases"
          contentpre=""
          contentmain="24 fewer cases"
          contentpost=" were processed with a self-loop"
          numeric="25%"
          nTrend="41.2%"
          trendPositive={true}
          trendIncreasing={false}
        />
      </div>

      <div className="MainContainer">
        <div className="LeftColumnContainer">
          <div className="ColumnHeader">Flowchart Overview</div>

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
                  data={[["Status", "Count"], ["yes", 9], ["no", 7], ["maybe", 6],["perhaps", 5],["aa", 3],["other", 8],]}
                  options={{
                    title:"Variant Counts",
                    pieHole: 0.6,
                    'width':340,
                    'height':240,
                    'backgroundColor': { fill:'transparent' },
                    legend: {position: 'none'},
                    pieSliceText: "none",
                    colors: ['#729AC2', '#DF8B5B', '#68B279', '#C95D61', '#897BB8', '#D9D9D9'],
                    
                    titleTextStyle: {
                        color: '#000000',   
                        fontName: 'IBM Plex Mono', 
                        fontSize: 14, 
                        bold: false,    
                        italic: false   
                    },
                    is3D: false,}
                  }
                />
                <div className="ChartInsideText">14</div>
              </div>
              <div className="Chart">
                <Chart
                  chartType="PieChart"
                  data={[["Status", "Count"], ["STP", 29], ["Non-STP", 62]]}
                  options={{
                    title:"STP Cases",
                    pieHole: 0.6,
                    'width':340,
                    'height':240,
                    'backgroundColor': { fill:'transparent' },
                    legend: {position: 'none'},
                    pieSliceText: "none",
                    
                    titleTextStyle: {
                      color: '#000000',   
                      fontName: 'IBM Plex Mono', 
                      fontSize: 14, 
                      bold: false,    
                      italic: false   
                  },
                  colors: ["#6AB451", "#D9D9D9"],
                    is3D: false,}
                  }
                />
                <div className="ChartInsideText">29/91</div>
              </div>
              <div className="Chart">
                <Chart
                  chartType="PieChart"
                  data={[["Status", "Count"], ["Longer than 3 days", 58], ["Shorter than 3 days", 22]]}
                  options={{
                    title:"Cases > 3 Days",
                    pieHole: 0.6,
                    'width':340,
                    'height':240,
                    'backgroundColor': { fill:'transparent' },
                    legend: {position: 'none'},
                    pieSliceText: "none",
                    
                    titleTextStyle: {
                      color: '#000000',   
                      fontName: 'IBM Plex Mono', 
                      fontSize: 14, 
                      bold: false,    
                      italic: false   
                  },
                  colors: ["#C95D61", "#D9D9D9"],
                    is3D: false,}
                  }
                />
                <div className="ChartInsideText">58/80</div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
