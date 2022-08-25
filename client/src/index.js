import React from "react";
import { hydrate, render } from "react-dom";
import "./index.css";
import Routess from "./Routes";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./component/Fallback";

const errorHandler = (error, errorInfo) => {
  console.log("logging", error, errorInfo);
};

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(
    <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
      <Routess />
    </ErrorBoundary>,
    rootElement
  );
} else {
  render(
    <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
      <Routess />
    </ErrorBoundary>,
    rootElement
  );
}
