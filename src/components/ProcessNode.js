import { Handle, Position } from "reactflow";
import Gradient from "javascript-color-gradient";

import "../assets/styles/FlowChart.css";

const handleStyle = { left: 10 };

const gradentParams = ["#EC6060", "#FFC0CB", "#FFFFFF", "#D4FADF", "#90EE90"];
const colorCellFromValue = (params, value, midpoint = 31) => {
  const getColorIndex = Math.round(midpoint * value);
  return new Gradient()
    .setColorGradient(...params)
    .setMidpoint(midpoint)
    .getColor(getColorIndex === 0 ? 0.01 : getColorIndex);
};

function ProcessNode({ data }) {
  return (
    <>
      <div className="PNode">
        <div
          className="PNodeStart"
          style={{
            backgroundColor: colorCellFromValue(
              gradentParams,
              data.stpRate ? data.stpRate : 0.5,
            ),
          }}
        >
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

          <div className="PNodeCount">{data.count ? data.count : "0"}</div>
          <img className="line" alt="Line" src="images/node_line.svg" />
          <div className="PNodeName">
            {data.stepName ? data.stepName : "Step"}
          </div>

          <div className="STPRate">
            {data.stpRate ? Math.round(data.stpRate * 100) + "%" : "50%"}
          </div>
        </div>
        <Handle type="source" position={Position.Top} id="top-from" />
        <Handle type="target" position={Position.Top} id="top-to" />
        <Handle type="source" position={Position.Bottom} id="bottom-from" />
        <Handle type="target" position={Position.Bottom} id="bottom-to" />
      </div>
    </>
  );
}

export default ProcessNode;
