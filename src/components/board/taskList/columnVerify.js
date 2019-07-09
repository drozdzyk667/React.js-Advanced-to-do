import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const ColumnVerify = props => {
  return (
    <div className="col-xl-3">
      <div className="TasksToDoHeader">
        <h2 style={props.verifyTasks.length === 30 ? { color: "red" } : null}>
          Test ({props.verifyTasks.length})
          <i style={{ fontSize: "18px" }}>/30 </i>
        </h2>
        <div>
          <b
            id="page-numbers"
            style={
              props.pageNumbers3.length < 2
                ? { display: "none" }
                : { display: "block" }
            }
          >
            {props.renderPageNumbers3}
          </b>
        </div>
        <h3
          style={
            props.verifyTasks.length > 0
              ? { display: "none" }
              : { display: "block", color: "red" }
          }
        >
          <i>None tasks to be verified !</i>
        </h3>
      </div>
      <div className="TasksToDoContainers">
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {props.verify}
        </ReactCSSTransitionGroup>
      </div>
    </div>
  );
};
export default ColumnVerify;
