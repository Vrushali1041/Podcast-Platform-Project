import React from "react";
import Button from "../../common/Button";

function EpisodeDetails({ index, title, description, audioFile, onClick }) {
  return (
    <div style={{ width: "100%", paddingBottom: "4.5rem" }}>
      <p style={{ textAlign: "left", marginBottom: 0, fontSize: "25px" }}>
        {index}. {title}
      </p>
      <p style={{ marginLeft: "1.5rem" }} className="podcast-description ">
        {description}
      </p>
      <Button
        text={"Play"}
        onClick={() => onClick(audioFile)}
        // width={"100px"}
        width={"100px"}
       // marginBottom={"3rem"}
      />
    </div>
  );
}

export default EpisodeDetails;