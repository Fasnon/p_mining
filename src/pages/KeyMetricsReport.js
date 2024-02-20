import ReportPage from "./ReportPage";
import DonutChart from "../components/DonutChart";

import Chart from "react-google-charts";
import dayjs from "dayjs";

import { useEffect, useState } from "react";
import { getCounts, getThroughputTime, getVariantCounts } from "../server/filereadserver";

import "../assets/styles/Report.css";

const KeyMetricsReport = (props) => {
  const [STP_count, setSTP_count] = useState(0);
  const [nonSTP_count, setNonSTP_count] = useState(0);
  const [total_count, setTotal_count] = useState(0);

  const [meanThroughputTime, setMeanThroughputTime] = useState(0);
  const [timeCounts, setTimeCounts] = useState([0, 0, 0, 0, 0, 0]);

  const [variantCounts, setVariantCounts] = useState(["placeholder", 0]);

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

    
    const variantCounts = getVariantCounts({
      sDate: props.startDate,
      eDate: props.endDate,
    });
    var result = [];
    
    for(var i in variantCounts)
        result.push([i, variantCounts [i]]);
    setVariantCounts(result)
    console.log([
      ["Status", "Count"]].concat(result))

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

    
    const variantCounts = getVariantCounts({
      sDate: props.startDate,
      eDate: props.endDate,
    });
    var result = [];
    
    for(var i in variantCounts)
        result.push([i, variantCounts [i]]);
    setVariantCounts(result)
    console.log([
      ["Status", "Count"]].concat(result))

  }, [props.startDate, props.endDate]);

  return (
    <>
      <div className="dummy-container">
        <ReportPage
          section="Key Metrics"
          startDate={dayjs(props.startDate).format("DD-MM-YYYY")}
          endDate={dayjs(props.endDate).format("DD-MM-YYYY")}
        ></ReportPage>
        <div className="dummy-overlay">
          <div className="section-header">
            <div className="rectangle" />
            <div className="section-header-text">Breakdown</div>
          </div>

          <div className="ChartBar">
            <DonutChart
              data={[
                ["Status", "Count"]].concat(variantCounts)
              }
              title="Variant Counts"
              colors={[
                "#729AC2",
                "#DF8B5B",
                "#68B279",
                "#C95D61",
                "#897BB8",
                "#D9D9D9",
              ]}
              text={variantCounts.length}
            />
            <DonutChart
              data={[
                ["Status", "Count"],
                ["STP", STP_count],
                ["Non-STP", nonSTP_count],
                // ["STP", 77],
                // ["Non-STP", 34],
              ]}
              title="STP Cases"
              colors={["#6AB451", "#D9D9D9"]}
              text={STP_count + "/" + total_count}
            />
            <DonutChart
              data={[
                ["Status", "Count"],
                [
                  "Longer than 5 days",
                  timeCounts[3] + timeCounts[4] + timeCounts[5],
                ],
                [
                  "Shorter than 5 days",
                  timeCounts[0] + timeCounts[1] + timeCounts[2],
                ],
                // ["Longer than 3 days", 42],
                // ["Shorter than 3 days", 4],
              ]}
              title="Cases > 5 Days"
              colors={["#C95D61", "#D9D9D9"]}
              // text={total_count - LessThreeDays_count + "/" + total_count}
              text={
                timeCounts[3] +
                timeCounts[4] +
                timeCounts[5] +
                "/" +
                total_count
              }
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
        <ReportPage
          section="Workflow"
          pageNumber="02"
          startDate={dayjs(props.startDate).format("DD-MM-YYYY")}
          endDate={dayjs(props.endDate).format("DD-MM-YYYY")}
        ></ReportPage>

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
