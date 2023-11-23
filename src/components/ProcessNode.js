import { useCallback } from "react";
import { Handle, Position } from "reactflow";

import "../assets/styles/FlowChart.css";

const handleStyle = { left: 10 };

function ProcessNode({ data }) {
  return (
    <>
      <div className="PNode">
        <div className="PNodeStart">
          <div className="ButtonBar">
            <div className="FocusButtonWrapper">
              <button className="FocusButton">
                <div className="FocusButtonText">Focus</div>
              </button>
            </div>
            <div className="ExcludeButtonWrapper">
              <button className="ExcludeButton">
                <div className="ExcludeButtonText">Exclude</div>
              </button>
            </div>
          </div>

          <div className="PNodeCount">{data.count ? data.count : "10,000"}</div>
          <img className="line" alt="Line" src="images/node_line.svg" />
          <div className="PNodeName">
            {data.stepName ? data.stepName : "Step"}
          </div>
        </div>
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} id="a" />
        <Handle type="source" position={Position.Top} />
        <Handle type="target" position={Position.Bottom} id="a" />
      </div>
    </>
  );
}

export default ProcessNode;
