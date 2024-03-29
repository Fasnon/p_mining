import "../assets/styles/IndivLookupCard.css";

const IndivLookupCard = (props) => {
  return (
    <div className="indiv">
      <div className="card-group">
        <div className="card-title">
          {props?.title ? props.title : "Throughput Time"}
        </div>
        <div className="card-main-value">
          {props?.metric !== null ? props.metric : "-"}
        </div>
        <div className="change-overlay">
          <div className="indicator-icon">
            <img
              alt="Streamline money"
              src="images/indiv-look-up-needs-improvement.svg"
            />
            <div className="indicator-text">
              This is higher than the goal of 3 days.
            </div>
          </div>
        </div>
        <div className="rectangle" />
      </div>
    </div>
  );
};

export default IndivLookupCard;
