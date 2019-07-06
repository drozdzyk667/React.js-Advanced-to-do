import React from "react";

const DevTasks = props => {
  return (
    <div>
      <div className="singleTask" style={props.taskColor}>
        <div className="control-buttons">
          <button className="btn btn-success" onClick={props.done}>
            ✔
          </button>
        </div>
        <p>
          <i>{props.taskType}</i>
        </p>
        <h4 className={props.priority ? "priority" : "standard"}>
          {props.priority ? props.name.toUpperCase() : props.name}
          <br />
        </h4>
        <i> {props.date ? `passed: ${props.date}` : props.date}</i>
        <i>
          {" "}
          {props.deadline ? `deadline: ${props.deadline}` : props.deadline}
        </i>
      </div>
    </div>
  );
};

export default DevTasks;
