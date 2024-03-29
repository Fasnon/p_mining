import ProcessNode from "../components/ProcessNode";

import React, { useCallback, useEffect, useState } from "react";

import {IdealWorkFlowCalculations} from "../utils/FlowchartCalculations";
import "../assets/styles/FlowChart.css";
import "reactflow/dist/style.css";

import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  MarkerType,
} from "reactflow";

import {
  originalEdges,
  originalNodes,
} from "../utils/FlowchartCalculations";
const nodeTypes = { processNode: ProcessNode };

var initialEdges = originalEdges;
var initialNodes = originalNodes;

function IdealWorkFlow({ data, onSelectionChange }) {
  const [mouseOverStep, setMouseOverStep] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    const updateNodes = async () => {
      console.log("on change");
      console.log(data);
      if (data) {
        console.log("ss");
        await IdealWorkFlowCalculations(data).then((nodesAndEdges) => {
          console.log(nodesAndEdges);
          setNodes(nodesAndEdges[0]);
          setEdges(nodesAndEdges[1]);
        });
      }
    };
    updateNodes();
  }, [data]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeMouseEnter={(event, node) => {
          console.log({ name: "onNodeMouseEnter", event, node });
          if (node.id.length > 1) {
            console.log(node.id);
            setMouseOverStep(node.id);
            onSelectionChange(node.id);
          }
        }}
        onNodeMouseLeave={(event, node) => {
          console.log({ name: "onNodeMouseLeave", event, node });
          setMouseOverStep(null);
          onSelectionChange(null);
        }}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls position="top-right" />

        <Background variant="dots" gap={16} size={1.5} />
      </ReactFlow>
    </>
  );
}

export default IdealWorkFlow;
