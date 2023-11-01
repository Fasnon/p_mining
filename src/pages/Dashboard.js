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
          title = "STP Rate"
          content = "55%"
        />
        <DashCard
          title = "Transactions"
          content = "430,000"
        />
        <DashCard
          title = "Cool Metric"
          content = "0.02"
        />
        <DashCard
          title = "Statistic 4"
          content = "7.000"
        />
        </div>
        </div>
    </div>

  );
};

export default Dashboard;
