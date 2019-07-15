import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import DevTasks from "./taskElements/devTasks";

const ColumnDev = props => {
  const dev = props.currentTasks2.map(task => (
    <DevTasks
      taskColor={task.taskColor}
      taskType={task.type}
      deadline={task.deadlineTask}
      date={task.passedTime}
      priority={task.priority}
      key={task.id}
      name={task.name}
      done={() => props.handlePush(task.id, props.devTasks, props.verifyTasks)}
    />
  ));

  const renderPageNumbers = props.pageNumbers2.map(number => {
    return (
      <button
        className="paginat btn btn-info btn-sm"
        key={number}
        id={number}
        onClick={e => {
          props.handleClickPage(e, props.devTasks);
        }}
      >
        {number}
      </button>
    );
  });
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
            {renderPageNumbers}
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
          {dev}
        </ReactCSSTransitionGroup>
      </div>
    </div>
  );
};
export default ColumnDev;
