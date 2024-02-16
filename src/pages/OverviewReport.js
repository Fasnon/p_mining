import ReportPage from "./ReportPage";
import "../assets/styles/Report.css";
import { Sheet } from "@mui/joy";
import OverviewCard from "../components/OverviewCard";
import DonutChart from "../components/DonutChart";

const OverviewReport = (props) => {
  return (
    <>
      <div className="dummy-container">
        <ReportPage></ReportPage>
        <div className="dummy-overlay">
          <div className="section-header">Quick Stats</div>
          <div className="quick-stats">
            <OverviewCard />
            <OverviewCard />
            <OverviewCard />
            <OverviewCard />
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
                ["< 1 day", 28],
                ["1 - 2 days", 23],
                ["2 - 5 days", 18],
                ["5 - 7 days", 9],
                ["7 - 14 days", 9],
                ["> 14 days", 24],
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
              text="1.84 days"
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
        AFFFFF
      </div>
    </>
  );
};

export default OverviewReport;
