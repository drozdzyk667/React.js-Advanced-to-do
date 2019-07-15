import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import VerifiedTasks from "./taskElements/verifiedTasks";

const ColumnVerify = props => {
  const verify = props.currentTasks3.map(task => (
    <VerifiedTasks
      taskColor={task.taskColor}
      taskType={task.type}
      deadline={task.deadlineTask}
      date={task.passedTime}
      priority={task.priority}
      key={task.id}
      name={task.name}
      done={() => props.handlePush(task.id, props.verifyTasks, props.done)}
    />
  ));

  const renderPageNumbers = props.pageNumbers3.map(number => {
    return (
      <button
        className="paginat btn btn-info btn-sm"
        key={number}
        id={number}
        onClick={e => {
          props.handleClickPage(e, props.verifyTasks);
        }}
      >
        {number}
      </button>
    );
  });
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
            {renderPageNumbers}
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
          {verify}
        </ReactCSSTransitionGroup>
      </div>
    </div>
  );
};
export default ColumnVerify;
