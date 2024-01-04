import React from "react";
import "../assets/styles/Dashboard.css";

const DashCard = (props) => {
  return (
    <div className="DashCard">
      <div className="DashCardMainGroup">
        <div className="DashCardMainGroupOverlap">
          <div className="DashCardTitle">
            {props?.title ? props.title : "Placeholder title"}
          </div>
          <p className="DashCardContent">
            <span className="DashCardContentPre">
              {props?.contentpre ? props.contentpre : ""}
            </span>
            <span
              className="DashCardContentMain"
              style={{ color: props?.trendPositive ? "#60EC6E" : "#EC6060" }}
            >
              {props?.contentmain ? props.contentmain : "24 fewer cases "}
            </span>
            <span className="DashCardContentPost">
              {props?.contentpost
                ? props.contentpost
                : "processed non-STP this week."}
            </span>
          </p>

          <div className="DashCardNumGroup">
            <div className="DashCardNum">
              {props?.numeric ? props.numeric : "198"}
            </div>
            <div className="DashCardNumGroupWrapper">
              <img
                className="DashCardNumTrendBG"
                alt="Rectangle"
                src={
                  props?.trendPositive
                    ? "/images/chips_rect_bg_green.svg"
                    : "/images/chips_rect_bg_red.svg"
                }
              />
              <img
                className="DashCardNumTrend"
                alt="Chips Decrease"
                src={
                  props?.trendIncreasing
                    ? "/images/chips_increase.svg"
                    : "/images/chips_decrease.svg"
                }
              />
              <div className="DashCardTrendNum">
                {props?.nTrend ? props.nTrend : "1000%"}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashCard;
