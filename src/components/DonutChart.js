
import { Chart } from "react-google-charts";

const DonutChart = ({ data, title, colors, text, total }) => {
    const options = {
      title,
      pieHole: 0.6,
      width: 340,
      height: 240,
      backgroundColor: { fill: "transparent" },
      legend: { position: "none" },
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
    };
  
    return (
      <div className="Chart">
        <Chart chartType="PieChart" data={data} options={options} />
        <div className="ChartInsideText">{text}</div>
      </div>
    );
  };
  
  export default DonutChart;