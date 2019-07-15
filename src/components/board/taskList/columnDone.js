import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import TaskDone from "./taskElements/taskDone";

const ColumnDone = props => {
  const tasksDone = props.currentTasks4.map(task => (
    <TaskDone
      taskColor={task.taskColor}
      taskType={task.type}
      deadline={task.deadlineTask}
      date={task.passedTime}
      priority={task.priority}
      key={task.id}
      name={task.name}
      deleteDone={() => props.handleDelete(task.id, props.done)}
    />
  ));

  const renderPageNumbers = props.pageNumbers4.map(number => {
    return (
      <button
        className="paginat btn btn-info btn-sm"
        key={number}
        id={number}
        onClick={e => {
          props.handleClickPage(e, props.done);
        }}
      >
        {number}
      </button>
    );
  });
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
            {renderPageNumbers}
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
          transitionLeaveTimeout={300}
        >
          {tasksDone}
        </ReactCSSTransitionGroup>
      </div>
    </div>
  );
};
export default ColumnDone;
