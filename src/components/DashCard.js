// import { useState } from "react";   
import "../Dashboard.css";
import { Card, CardHeader, CardContent, Divider, Typography} from "@mui/material";

import React from "react";
function DashCard(props) {
  // const [data] = useState(props.data);

  // let options = data.map((item, index) => (
  //   <option key={index} value={item}>
  //     {item}
  //   </option>
  // ));

  return (
    <Card className="DashCard" 
    elevation={props?.elevation? props.elevation : 3}
    >
      {/* card header and action */}
      {/* {!darkTitle && title && (
        <CardHeader
          sx={headerSX}
          titleTypographyProps={{ variant: "subtitle1" }}
          title={title}
          action={secondary}
        />
      )} */}
      {/* {darkTitle && title && ( */}
        <CardHeader
          className="DashCardTitle"
          // sx={headerSX}

          titleTypographyProps={{ variant: "subtitle1" }}
          title={<Typography variant="h3">{props?.title? props.title : "Placeholder title"}</Typography>}
          // action={secondary}
        />
      {/* )} */}

      {/* card content */}
      <div>
      <CardContent
        style={{ paddingTop: "0px"}}
        className="DashCardContent"
      > {props?.content? props.content : "Placeholder content. Lorem ipsun Lorem ipsum"}</CardContent>

      </div>
      {/* {!content && c}hildren} */}

      {/* card footer - clipboard & highlighter  */}
      {/* {codeHighlight && ( */}
        <>
          <Divider sx={{ borderStyle: "dashed" }} />
          {/* <Highlighter codeHighlight={codeHighlight} main>
            {children}
          </Highlighter> */}
        </>
      {/* )} */}
    </Card>
  );
}

export default DashCard;
