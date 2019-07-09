import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const ColumnDev = props => {
  return (
    <div className="col-xl-3">
      <div className="TasksToDoHeader">
        <h2 style={props.devTasks.length === 30 ? { color: "red" } : null}>
          Dev ({props.devTasks.length})<i style={{ fontSize: "18px" }}>/30 </i>
        </h2>
        <div>
          <b
            id="page-numbers"
            style={
              props.pageNumbers2.length < 2
                ? { display: "none" }
                : { display: "block" }
            }
          >
            {props.renderPageNumbers2}
          </b>
        </div>
        <h3
          style={
            props.devTasks.length > 0
              ? { display: "none" }
              : { display: "block", color: "red" }
          }
        >
          <i>None tasks to be developed !</i>
        </h3>
      </div>
      <div className="TasksToDoContainers">
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {props.dev}
        </ReactCSSTransitionGroup>
      </div>
    </div>
  );
};
export default ColumnDev;
