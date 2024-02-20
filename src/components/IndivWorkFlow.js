import ProcessNode from "../components/ProcessNode";

import React, { useCallback, useEffect, useState } from "react";

import dayjs from "dayjs";

import {IndivWorkflowCalculations} from "../utils/FlowchartCalculations";
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

function IndivWorkFlow({ businessIK, onSelectionChange, onEdgeSelectionChange }) {
    const [mouseOverStep, setMouseOverStep] = useState(null);
    const [mouseOverTransact, setMouseOverTransact] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    const updateNodes = async () => {
      if (businessIK) {
        console.log("ss");
        await IndivWorkflowCalculations(businessIK).then((nodesAndEdges) => {
          console.log(nodesAndEdges);
          setNodes(nodesAndEdges[0]);
          setEdges(nodesAndEdges[1]);
        });
      }
    };
    updateNodes();
  }, [businessIK]);

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
        onEdgeMouseEnter={(event, edge) => {
            console.log({ name: "onEdgeMouseEnter", event }, edge.source, edge.target);
            const title = "Transaction " + (edges.findIndex(
                (e) => e.id == edge.id) + 1);
            console.log(edge.sourceNode)

            var nodesCopy = JSON.parse(JSON.stringify(nodes));

            const source = nodesCopy.filter((n) => n.id = edge.source)[0]
            nodesCopy = JSON.parse(JSON.stringify(nodes));
            const target = nodesCopy.filter((n) => n.id = edge.target)[0]
            var body = "Time started: " + source.data.count
            body += "Time finished: " + target.data.count
            body += "Is STP: -" 
            body += "Time taken: "  + dayjs(source.data.count).diff(dayjs(target.data.count))
            body += "Additional Manual Actions: -"
            onEdgeSelectionChange(title, body)
        }}
        onEdgeMouseLeave={(event, edge) => {
            onEdgeSelectionChange(null, null)

        }
        }
        onNodeMouseLeave={(event, node) => {
          console.log({ name: "onNodeMouseLeave", event, node });
            setMouseOverStep(null);
            onSelectionChange(null);
        }}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls position="top-right" />

        <Background variant="dots" gap={16} size={1.5} />
      </ReactFlow>
    </>
  );
}

export default IndivWorkFlow;
