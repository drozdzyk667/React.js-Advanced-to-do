import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const ColumnDone = props => {
  return (
    <div className="col-xl-3">
      <div className="TasksToDoHeader">
        <h2 style={props.done.length === 30 ? { color: "red" } : null}>
          Done ({props.done.length})<i style={{ fontSize: "18px" }}>/30 </i>
        </h2>
        <button
          style={
            props.done.length > 0
              ? { visibility: "visible" }
              : { visibility: "hidden" }
          }
          id="done"
          className="btn btn-danger"
          onClick={props.deleteAll}
        >
          Delete all
        </button>
        <div>
          <b
            id="page-numbers"
            style={
              props.pageNumbers4.length < 2
                ? { display: "none" }
                : { display: "block" }
            }
          >
            {props.renderPageNumbers4}
          </b>
        </div>
        <h3
          style={
            props.done.length > 0
              ? { display: "none" }
              : { display: "block", color: "red" }
          }
        >
          <i>None task is done !</i>
        </h3>
      </div>
      <div className="TasksToDoContainers">
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={100}
        >
          {props.tasksDone}
        </ReactCSSTransitionGroup>
      </div>
    </div>
  );
};
export default ColumnDone;
