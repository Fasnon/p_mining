import ReportPage from "./ReportPage";
import DonutChart from "../components/DonutChart";

import Chart from "react-google-charts";

import "../assets/styles/Report.css";

const KeyMetricsReport = (props) => {
  return (
    <>
      <div className="dummy-container">
        <ReportPage section="Key Metrics"></ReportPage>
        <div className="dummy-overlay">
          <div className="section-header">
            <div className="rectangle" />
            <div className="section-header-text">Breakdown</div>
          </div>

          <div className="ChartBar">
            <DonutChart
              data={[
                ["Status", "Count"],
                ["yes", 9],
                ["no", 7],
                ["maybe", 6],
                ["perhaps", 5],
                ["aa", 3],
                ["other", 8],
              ]}
              title="Variant Counts"
              colors={[
                "#729AC2",
                "#DF8B5B",
                "#68B279",
                "#C95D61",
                "#897BB8",
                "#D9D9D9",
              ]}
              text="14"
            />
            <DonutChart
              data={[
                ["Status", "Count"],
                //   ["STP", STP_count],
                //   ["Non-STP", nonSTP_count],
                ["STP", 77],
                ["Non-STP", 34],
              ]}
              title="STP Cases"
              colors={["#6AB451", "#D9D9D9"]}
              text={77 + "/" + 111}
            />
            <DonutChart
              data={[
                ["Status", "Count"],
                //   ["Longer than 3 days", total_count - LessThreeDays_count],
                //   ["Shorter than 3 days", LessThreeDays_count],
                ["Longer than 3 days", 42],
                ["Shorter than 3 days", 4],
              ]}
              title="Cases > 3 Days"
              colors={["#C95D61", "#D9D9D9"]}
              // text={total_count - LessThreeDays_count + "/" + total_count}
              text={54 + "/" + 6}
            />
          </div>
          <div className="section-header">
            <div className="rectangle" />
            <div className="section-header-text">Transaction Over Time</div>
          </div>

          <div className="HistoricalTrendChart">
            <Chart
              chartType="AreaChart"
              data={[
                [
                  "Week",
                  "STP",
                  "Non-STP",
                  {
                    sourceColumn: 0,
                    role: "annotation",
                    type: "string",
                    calc: "stringify",
                  },
                ],
                [
                  "29 Oct - 4 Nov",
                  32000,
                  19202,
                  Math.round((32000 / (32000 + 19202)) * 100) + "%",
                ],
                [
                  "5 Nov - 11 Nov",
                  68100,
                  9920,
                  Math.round((68100 / (68100 + 9920)) * 100) + "%",
                ],
                [
                  "12 Nov - 18 Nov",
                  29105,
                  44201,
                  Math.round((29105 / (29105 + 44201)) * 100) + "%",
                ],
                [
                  "19 Nov - 25 Nov",
                  14400,
                  39391,
                  Math.round((14400 / (14400 + 39391)) * 100) + "%",
                ],
              ]}
              options={{
                isStacked: true,

                bar: { groupWidth: "30%" },
                width: "100%",
                height: 300,
                backgroundColor: { fill: "transparent" },
                pieSliceText: "none",

                titleTextStyle: {
                  color: "#000000",
                  fontName: "IBM Plex Mono",
                  fontSize: 14,
                  bold: false,
                  italic: false,
                },
                colors: ["#6AB451", "#C95D61"],
                is3D: false,
              }}
            />
          </div>
        </div>
      </div>
      <br />
      <div className="dummy-container">
        <ReportPage section="Workflow" pageNumber="02"></ReportPage>

        <div className="dummy-overlay">
          <div className="section-header">
            <div className="rectangle" />
            <div className="section-header-text">Transactions</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KeyMetricsReport;
