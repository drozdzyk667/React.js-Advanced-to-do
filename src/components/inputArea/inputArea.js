import React from "react";
import "./inputArea.scss";
import workTable from "./work-table.png";

const InputArea = props => {
  let options = [
    "Review",
    "Code",
    "Test",
    "Document",
    "Analyze",
    "Fix",
    "Others"
  ];
  const selectInput = options.map(option => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  return (
    <div className="InputArea">
      <h2>Your Scrum Board</h2>
      <div className="inputField">
        <label htmlFor="inp" className="inp">
          <input
            id="inp"
            type="text"
            name="inputValue"
            value={props.inputValue}
            onChange={props.onChange}
            maxLength="30"
            placeholder="&nbsp;"
            onKeyPress={props.enter}
          />
          <span className="label">Input task</span>
          <span className="border" />
        </label>

        <div className="squaredCheckbox">
          <label htmlFor="checkb">
            <input
              type="checkbox"
              id="checkb"
              checked={props.priority}
              onChange={props.priorityStatus}
            />
            <label htmlFor="mark" />
            <i>High priority</i>
          </label>
        </div>

        <div className="AddBtnContainer">
          <button
            id="addBtn"
            className="btn btn-primary"
            onClick={props.addTask}
          >
            Add ✚
          </button>
          <p>
            {props.addActive && props.inputValue === ""
              ? `Fill task field firstly`
              : null}
          </p>
        </div>
      </div>

      <div className="selectBox">
        <label htmlFor="choice">
          <p>Task type: </p>
          <select
            style={props.color}
            value={props.type}
            onChange={props.select}
            id="choice"
          >
            {selectInput}
          </select>
        </label>
      </div>

      <div className="deadlineDate">
        <label htmlFor="date">
          <p>Deadline date: </p>
          <input
            id="date"
            type="date"
            value={props.date}
            min={props.minimumDate}
            max={props.maximumDate}
            onChange={props.handleDate}
          />
        </label>
      </div>

      <img src={workTable} alt="work-table" />
    </div>
  );
};
export default InputArea;
