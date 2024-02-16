import "../assets/styles/ReportPage.css";
import { Sheet } from "@mui/joy";

const ReportPage = (props) => {
  return (
    <>
      <div className="page-index">
        <div className="page-group-wrapper">
          <div className="page-group">
            <div className="header">
              <div className="header-report-name">
                Process Mining Report (Equities)
              </div>
              <div className="header-right">
                <div className="header-section-name">
                  {props?.section ? props.section : "Overview"}
                </div>
                <img
                  className="header-vertical-separator"
                  alt="Separator"
                  src="/images/header-vertical-separator.svg"
                />
              </div>
              <div className="header-page-number">
                {props?.pageNumber ? props.pageNumber : "01"}
              </div>
              <img
                className="header-horizontal-line"
                alt="Line"
                src="/images/header-horizontal-line.svg"
              />
            </div>
            <div className="footer">
              <div className="footer-text">
                Process Mining Report (Equities)
              </div>
              <img
                className="footer-line"
                alt="Line"
                src="/images/footer-line.svg"
              />
            </div>
            <div className="main-rectangle" />
            <p className="main-title">Equities - insights and analysis</p>
            <div className="main-date">01-02-2024 to 07-02-2024</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportPage;
