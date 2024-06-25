import React from "react";
import { BeatLoader, PropagateLoader } from "react-spinners";

const spinnerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  color: "#36d7b7",
};

const propagateStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: "100px",
  color: "#ffff",
  paddingTop: "0px",
};

export const PropagateLoaders = () => (
  <PropagateLoader size={4} cssOverride={propagateStyle} />
);

const lazySpinner = () => {
  return (
    <>
      <div style={spinnerStyle}>
        <BeatLoader color="#0d6efd" size={15} />
      </div>
    </>
  );
};

export default lazySpinner;
