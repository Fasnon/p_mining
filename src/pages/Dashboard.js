import "../assets/styles/App.css";
import "../assets/styles/Dashboard.css";
import DashCard from "../components/DashCard";
import React, { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  MarkerType,
} from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
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
        <div className="ColumnContainer">
          <div className="ColumnHeader">Flowchart Overview</div>

          <div className="ReactFlowBg">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
            >
              <Controls position="top-right" />

              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>
        </div>
        <div className="ColumnContainer">
          <div className="ColumnHeader">Key Metrics</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
