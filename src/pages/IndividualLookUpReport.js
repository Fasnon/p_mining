import ReportPage from "./ReportPage";
import IndivLookupCard from "../components/IndivLookupCard";
import { Input } from "@mui/joy";
import "../assets/styles/Report.css";
import IdealWorkFlow from "../components/IdealWorkFlow"


const IndividualLookUpReport = (props) => {
  return (
    <>
      <div className="dummy-container">
        <ReportPage section="Individual Look-up"></ReportPage>
        <div className="dummy-overlay">
          <div className="section-header">
            <div className="rectangle" />
            <div className="section-header-text">Individual Look Up</div>
          </div>
          <div className="bk-enter">
            Input a Business IK:
            <div className="bk-input">
              <Input
                placeholder="Enter Business IK here..."
                variant="soft"
                sx={{
                  borderBottom: "2px solid",
                  borderColor: "#444444",
                  "&:hover": {
                    borderColor: "#262F81",
                  },
                  "--Input-minHeight": "42px",
                }}
              />
            </div>
          </div>

          <IndivLookupCard />
          <IndivLookupCard />
          <IndivLookupCard />
          <div className="section-header">
            <div className="section-header-text">Flowchart Overview</div>
          </div>
          
          <div className="rectangle-alt" />

          
          <div className="ReactFlowBg2">
            <IdealWorkFlow />
          </div>


        </div>
        AFFFFF
      </div>
    </>
  );
};

export default IndividualLookUpReport;
