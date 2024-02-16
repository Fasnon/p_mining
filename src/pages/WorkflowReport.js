import ReportPage from "./ReportPage";
import IdealWorkFlow from "../components/IdealWorkFlow";

const WorkflowReport = (props) => {
  return (
    <>
      <div className="dummy-container">
        <ReportPage section="Workflow"></ReportPage>
        <div className="dummy-overlay">
          <div className="section-header">
            <div className="rectangle" />
            <div className="section-header-text">Flowchart Overview</div>
          </div>
          <div className="ReactFlowBg">
            <IdealWorkFlow />
          </div>
          s
        </div>
      </div>
    </>
  );
};

export default WorkflowReport;
