import ReportPage from "./ReportPage";
import IndivLookupCard from "../components/IndivLookupCard";
import { Input } from "@mui/joy";
import "../assets/styles/Report.css";
import IndivWorkFlow from "../components/IndivWorkFlow";

import dayjs from "dayjs";
import { Autocomplete } from "@mui/joy";
import { getAllBusinessIK, indivLookup } from "../server/filereadserver";
import { useState, useEffect } from "react";


const IndividualLookUpReport = (props) => {
  const [mouseOverStep, setMouseOverStep] = useState(null);

  const [businessIKList, setBusinessIKList] = useState([]);
  const [selectedBusinessIK, setSelectedBusinessIK] = useState(null);

  const [throughputtime, setThroughputtime] = useState(0);
  const [repeatedSteps, setRepeatedSteps] = useState(0);

  useEffect(() => {
    setBusinessIKList(getAllBusinessIK());
  }, []);

  useEffect(() => {
    if (selectedBusinessIK) {
      const lookup = indivLookup({ businessIK: selectedBusinessIK });
      setThroughputtime(lookup["ThroughputTime"]);
      setRepeatedSteps(lookup["RepeatedSteps"]);
    }
  }, [selectedBusinessIK]);

  const handleSelectionChange = async (newMouseOverStep) => {
    setMouseOverStep(newMouseOverStep);
    props.onMouseOverChange(newMouseOverStep);
    console.log(newMouseOverStep + "logged in indivlookup");
  };

  const handleEdgeSelection = async (newEdgeSelectionTitle, newEdgeSelectionBody) => {
    props.onEdgeSelection(newEdgeSelectionTitle, newEdgeSelectionBody);
    // console.log(newMouseOverStep + "logged in indivlookup");
  };


  return (
    <>
      <div className="dummy-container">
        <ReportPage
          section="Individual Look-up"
          startDate={dayjs(props.startDate).format("DD-MM-YYYY")}
          endDate={dayjs(props.endDate).format("DD-MM-YYYY")}
        ></ReportPage>
        <div className="dummy-overlay">
          <div className="section-header">
            <div className="rectangle" />
            <div className="section-header-text">Individual Look Up</div>
          </div>
          <div className="bk-enter">
            Input a Business IK:
            <div className="bk-input">
              <Autocomplete
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
                options={businessIKList}
                onInputChange={(event, value) => {
                  console.log("Choice : " + value);
                  setSelectedBusinessIK(value);
                }}
              />
            </div>
          </div>
          {selectedBusinessIK ? (
            <>
              <IndivLookupCard
                title="Throughput Time (Days)"
                metric={
                  throughputtime < 0.1
                    ? throughputtime.toPrecision(2)
                    : throughputtime.toPrecision(3)
                }
              />
              <IndivLookupCard title="Additional Manual Actions" metric="-"/>
              <IndivLookupCard title="Repeated Steps" metric={repeatedSteps} />
              <div className="section-header">
                <div className="section-header-text">Flowchart Overview</div>
              </div>

              <div className="rectangle-alt" />

              <div className="ReactFlowBg2">
                <IndivWorkFlow businessIK={selectedBusinessIK} 
                onSelectionChange={handleSelectionChange} 
                onEdgeSelectionChange={handleEdgeSelection} />
              </div>
            </>
          ) : null}
        </div>
        AFFFFF
      </div>
    </>
  );
};

export default IndividualLookUpReport;
