import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import TaskToDo from "./taskElements/taskToDo";

const ColumnTasksToDo = props => {
  const tasksToDo = props.currentTasks1.map(task => (
    <TaskToDo
      taskColor={task.taskColor}
      taskType={task.type}
      deadline={task.deadlineTask}
      priority={task.priority}
      key={task.id}
      acceptRefuseStatus={props.acceptRefuse}
      acceptRefuse={props.handleAcceptRefuse}
      name={task.name}
      delete={() => props.handleDelete(task.id, props.tasks)}
      done={() => props.handlePush(task.id, props.tasks, props.devTasks)}
    />
  ));

  const renderPageNumbers = props.pageNumbers1.map(number => {
    return (
      <button
        className="paginat btn btn-info btn-sm"
        key={number}
        id={number}
        onClick={e => {
          props.handleClickPage(e, props.tasks);
        }}
      >
        {number}
      </button>
    );
  });

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
            {renderPageNumbers}
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
          transitionLeaveTimeout={300}
        >
          {tasksToDo}
        </ReactCSSTransitionGroup>
      </div>
    </div>
  );
};
export default ColumnTasksToDo;
