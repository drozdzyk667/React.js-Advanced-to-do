import React from "react";

const TaskDone = props => {
  return (
    <div>
      <div
        className={props.priority ? "singleTaskPriority" : "singleTask"}
        style={props.taskColor}
      >
        <div className="control-buttons">
          <button className="btn btn-danger" onClick={props.deleteDone}>
            ✘
          </button>
        </div>
        <p>
          <i>{props.taskType}</i>
        </p>
        <h4 className={props.priority ? "priority" : "standard"}>
          {props.priority ? props.name.toUpperCase() : props.name}
          <br />
        </h4>
        <i> {props.date ? `done: ${props.date}` : props.date}</i>
        <i>
          {" "}
          {props.deadline ? `deadline: ${props.deadline}` : props.deadline}
        </i>
      </div>
    </div>
  );
};

export default TaskDone;
