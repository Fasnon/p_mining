import { Chart } from "react-google-charts";

const DonutChart = ({
  data,
  title,
  colors,
  text,
  total,
  width,
  height,
  labelled,
  slices,
}) => {
  const options = {
    title,
    pieHole: 0.6,
    width: width ? width : 256,
    height: height ? height : 240,
    backgroundColor: { fill: "transparent" },
    legend: { position: labelled ? "labeled" : "none" },
    pieSliceText: "none",
    titleTextStyle: {
      color: "#000000",
      fontName: "IBM Plex Mono",
      fontSize: 14,
      bold: false,
      italic: false,
    },
    colors,
    is3D: false,
    chartArea: { width: "95%", height: "80%" },
    slices: slices
      ? {
          0: { offset: 0.03 },
          1: { offset: 0.05 },
          2: { offset: 0.08 },
          3: { offset: 0.13 },
          4: { offset: 0.16 },
          5: { offset: 0.17 },
        }
      : "",
  };

  return (
    <div>
      <div
        className="Chart"
        style={{ height: height ? height : 240, width: width ? width : 256 }}
      >
        <div className="ChartText">{text}</div>
        <Chart chartType="PieChart" data={data} options={options}></Chart>
      </div>
    </div>
  );
};

export default DonutChart;
