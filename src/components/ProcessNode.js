import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import Gradient from 'javascript-color-gradient';

import "../assets/styles/FlowChart.css";

const handleStyle = { left: 10 };

const gradentParams = ['#EC6060', '#FFC0CB', '#FFFFFF', '#D4FADF', '#90EE90'];
const colorCellFromValue = (params, value, midpoint = 31) => {
  const getColorIndex = Math.round(midpoint * value);
  return new Gradient()
    .setColorGradient(...params)
    .setMidpoint(midpoint).getColor(getColorIndex === 0 ? 0.01 : getColorIndex);
};

console.log(colorCellFromValue(gradentParams, 43))

function ProcessNode({ data }) {
  return (
    <>
      <div className="PNode">
        <div className="PNodeStart" style={{ backgroundColor: colorCellFromValue(gradentParams, data.stpRate ? data.stpRate : 0.5) }} >
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
          
          <div className="STPRate">{data.stpRate ? Math.round(data.stpRate * 100) + "%": "50%"}</div>
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
