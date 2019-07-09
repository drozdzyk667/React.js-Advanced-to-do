import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const ColumnTasksToDo = props => {
  return (
    <div className="col-xl-3">
      <div className="TasksToDoHeader">
        <h2 style={props.tasks.length === 30 ? { color: "red" } : null}>
          To do ({props.tasks.length})<i style={{ fontSize: "18px" }}>/30 </i>
        </h2>{" "}
        <h6>
          <i>(ordered by task type and priority in there)</i>
        </h6>
        <button
          style={
            props.tasks.length > 0
              ? { visibility: "visible" }
              : { visibility: "hidden" }
          }
          id="tasks"
          className="btn btn-danger"
          onClick={props.deleteAll}
        >
          Delete all
        </button>
        <div>
          <b
            id="page-numbers"
            style={
              props.pageNumbers1.length < 2
                ? { display: "none" }
                : { display: "block" }
            }
          >
            {props.renderPageNumbers1}
          </b>
        </div>
        <h3
          style={
            props.tasks.length > 0
              ? { display: "none" }
              : { display: "block", color: "red" }
          }
        >
          <i>None tasks to be done !</i>
        </h3>
      </div>
      <div className="TasksToDoContainers">
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={100}
        >
          {props.tasksToDo}
        </ReactCSSTransitionGroup>
      </div>
    </div>
  );
};
export default ColumnTasksToDo;
