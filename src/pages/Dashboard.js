import "../App.css";
import "../Dashboard.css";
import React from "react";
import DashCard from "../components/DashCard";

const Dashboard = () => {
  return (
    <div className="App">
      <header className="Dashboard-header">
        <h3>Process Mining Dashboard</h3>
      </header>
      <div>
        <div className="CardBar">
          <DashCard
            title="Mean Days to Completion"
            contentpre="An additional "
            contentmain="40 cases"
            contentpost=" were processed within 2 days or less."
            numeric="1.82"
            nTrend="23.8%"
            trendPositive={true}
            trendIncreasing={false}
          />
          <DashCard
            title="Non-STP Cases"
            contentpre=""
            contentmain="29 fewer cases"
            contentpost=" were processed non-STP this week."
            numeric="29%"
            nTrend="71.2%"
            trendPositive={true}
            trendIncreasing={false}
          />
          <DashCard
            title="Self Loop Cases"
            contentpre=""
            contentmain="12 more cases"
            contentpost=" had a self-loop within their processing."
            numeric="25%"
            nTrend="14.0%"
            trendPositive={false}
            trendIncreasing={true}
          />
          <DashCard
            title="Self Loop Cases"
            contentpre=""
            contentmain="24 fewer cases"
            contentpost=" were processed with a self-loop"
            numeric="25%"
            nTrend="41.2%"
            trendPositive={true}
            trendIncreasing={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
