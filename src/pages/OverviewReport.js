import ReportPage from "./ReportPage";
import "../assets/styles/Report.css";
import { Sheet } from "@mui/joy";
import OverviewCard from "../components/OverviewCard";
import DonutChart from "../components/DonutChart";
import { getCounts, getThroughputTime } from "../server/filereadserver";
import dayjs from "dayjs";

import { useEffect, useState } from "react";

const OverviewReport = (props) => {
  const [STP_count, setSTP_count] = useState(0);
  const [nonSTP_count, setNonSTP_count] = useState(0);
  const [total_count, setTotal_count] = useState(0);

  const [meanThroughputTime, setMeanThroughputTime] = useState(0);
  const [timeCounts, setTimeCounts] = useState([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const counts = getCounts({ sDate: props.startDate, eDate: props.endDate });

    setSTP_count(counts["STP_count"]);
    setNonSTP_count(counts["nonSTP_count"]);
    setTotal_count(counts["total_count"]);

    const throughputTimes = getThroughputTime({
      sDate: props.startDate,
      eDate: props.endDate,
    });

    setMeanThroughputTime(throughputTimes["MeanThroughputTime"]);
    setTimeCounts(throughputTimes["timeCounts"]);
  }, []);

  useEffect(() => {
    const counts = getCounts({ sDate: props.startDate, eDate: props.endDate });

    setSTP_count(counts["STP_count"]);
    setNonSTP_count(counts["nonSTP_count"]);
    setTotal_count(counts["total_count"]);

    const throughputTimes = getThroughputTime({
      sDate: props.startDate,
      eDate: props.endDate,
    });

    setMeanThroughputTime(throughputTimes["MeanThroughputTime"]);
    setTimeCounts(throughputTimes["timeCounts"]);
  }, [props.startDate, props.endDate]);

  return (
    <>
      <div className="dummy-container">
        <ReportPage
          startDate={dayjs(props.startDate).format("DD-MM-YYYY")}
          endDate={dayjs(props.endDate).format("DD-MM-YYYY")}
        ></ReportPage>
        <div className="dummy-overlay">
          <div className="section-header">Quick Stats</div>
          <div className="quick-stats">
            <OverviewCard
              title="Mean Throughput Time (Days)"
              metric={
                meanThroughputTime < 0.1
                  ? meanThroughputTime.toPrecision(2)
                  : meanThroughputTime.toPrecision(3)
              }
            />
            <OverviewCard title="STP Cases" metric={STP_count} />
            <OverviewCard title="Additional Manual Actions" />
            <OverviewCard title="Trade Volume" metric={total_count} />
          </div>
          <div className="section-header">
            At a glance - Powered by AI
            <img
              className="lightning-icon"
              alt="Group"
              src="images/lightning.png"
            />
          </div>
          <div className="at-a-glance">
            <div className="rectangle" />
            <div className="body">
              In the recent performance analysis, significant changes were
              observed across four key indicators. Mean Throughput Time (Days)
              improved by processing 40 additional cases within 2 days or less,
              resulting in a 23.8% decrease, indicating enhanced efficiency.
              <br />
              <br />
              Conversely, STP Cases increased by 29, but marked a considerable
              71.2% decrease, prompting further investigation. Additional Manual
              Actions decreased by 25%, signaling reduced manual interventions
              despite a slight uptick of 14.0%. Trade Volume saw a substantial
              decline of 24,639 cases, reflecting a significant 41.2% decrease
              in overall workload. These insights inform decisions for
              optimizing operational processes.
            </div>
          </div>
          <div className="section-header">Mean Processing Time</div>
          <div className="mean-processing-time">
            <DonutChart
              data={[
                ["Status", "Count"],
                ["< 1 day", timeCounts[0]],
                ["1 - 2 days", timeCounts[1]],
                ["2 - 5 days", timeCounts[2]],
                ["5 - 7 days", timeCounts[3]],
                ["7 - 14 days", timeCounts[4]],
                ["> 14 days", timeCounts[5]],
              ]}
              title=""
              colors={[
                "#5D82A6",
                "#60AAD3",
                "75D1C0",
                "49B467",
                "5B6C98",
                "D9D9D9",
              ]}
              // text={total_count - LessThreeDays_count + "/" + total_count}
              text={
                meanThroughputTime < 0.1
                  ? meanThroughputTime.toPrecision(2)
                  : meanThroughputTime.toPrecision(3)
              }
              height="320px"
              width="400px"
              labelled="true"
              slices="true"
            />

            <div className="mean-processing-time-text">
              <div className="rectangle" />
              We managed to process the majority of trades within 5 days,
              however there still exist a significant proportion of cases,
              32.9%, which require more than 2 weeks to process.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewReport;
