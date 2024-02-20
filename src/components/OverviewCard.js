import "../assets/styles/OverviewCard.css";
const OverviewCard = (props) => {
  return (
    <>
      <div className="overview-card">
        <div className="card-group">
          <div className="card-title">
            {props?.title ? props.title : "Trade Volume"}
          </div>
          <div className="card-main-value">
            {props?.metric ? props.metric : "-"}
          </div>
          <div className="change-overlay">
            <img
              className="streamline-money"
              alt="Streamline money"
              src="images/chips_increase.svg"
            />
            <div className="change-value">41.2%</div>
          </div>
          <div className="rectangle" />
        </div>
      </div>
    </>
  );
};

export default OverviewCard;
