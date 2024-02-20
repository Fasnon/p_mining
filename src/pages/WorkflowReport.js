import ReportPage from "./ReportPage";
import IdealWorkFlow from "../components/IdealWorkFlow";
import dayjs from "dayjs";
import { useState } from "react";

const WorkflowReport = (props) => {
  const [mouseOverStep, setMouseOverStep] = useState(null);

  const handleSelectionChange = async (newMouseOverStep) => {
    setMouseOverStep(newMouseOverStep);
    props.onMouseOverChange(newMouseOverStep);

    console.log(newMouseOverStep + "logged in workflow");
  };
  return (
    <>
      <div className="dummy-container">
        <ReportPage
          section="Workflow"
          startDate={dayjs(props.startDate).format("DD-MM-YYYY")}
          endDate={dayjs(props.endDate).format("DD-MM-YYYY")}
        ></ReportPage>
        <div className="dummy-overlay">
          <div className="section-header">
            <div className="rectangle" />
            <div className="section-header-text">Flowchart Overview</div>
          </div>
          <div className="ReactFlowBg">
            <IdealWorkFlow
              data={props.data}
              onSelectionChange={handleSelectionChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkflowReport;
