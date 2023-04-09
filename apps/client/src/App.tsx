import * as React from "react";
import "./App.css";
import { CounterButton, NewTabLink } from "ui";
import IndexPage from "./pages/IndexPage";

export const App = () => {
 
  return (
    <div className="container">
      <h1 className="title">
        Admin <br />
        <span>Kitchen Sink</span>
      </h1>
      <CounterButton /> 
      <IndexPage />
     </div>
  )
}
