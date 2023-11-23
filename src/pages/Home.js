import { useNavigate } from "react-router-dom";
import "../assets/styles/App.css";
import Spacer from "../components/Spacer";
import React from "react";

function Home() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/dashboard");
  }

  return (
    <>
      <header className="App-header">
        <h3>Process Mining Dashboard</h3>
        <div className="file-upload">
          <p>To get started, simply upload an excel file for analysis:</p>
          <Spacer size={8} />
          <div className="upload-btn-wrapper">
            <button className="upload-btn">
              Upload a file
              <input
                type="file"
                name="myfile"
                onChange={() => {
                  console.log("New file uploaded");
                  handleClick();
                  console.log("New file uploaded4");
                }}
              />
            </button>
          </div>
        </div>

        <p>
          Or, view analysis of Snowflake data <a href="/dashboard">here</a>.
        </p>
      </header>
    </>
  );
}

export default Home;
