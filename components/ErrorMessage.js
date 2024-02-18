import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const ErrorMessageShowBox = ({ errorMessage, hasToshow }) => {
  return (
    <div
      id="error"
      className={`ErrorMessageBox ${errorMessage ? "ShakeAnimation" : null}`}
      style={{
        opacity: errorMessage ? 1 : 0,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      {hasToshow ? (
        <>
          <FontAwesomeIcon icon={faCircleXmark} />
          {errorMessage}
        </>
      ) : null}
    </div>
  );
};

export default ErrorMessageShowBox;
