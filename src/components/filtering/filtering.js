import React from "react";
import "./filtering.scss";

let options = [
  "All",
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

const Filtering = props => {
  return (
    <div className="filtering">
      <div className="selectBox">
        <label htmlFor="filter">
          <p>Filter by type: </p>
          <select
            value={props.filterType}
            onChange={props.filterAll}
            id="filter"
          >
            {selectInput}
          </select>
        </label>
      </div>

      <div className="selectBox">
        <label htmlFor="tasksPerPage">
          <p>Per Page: </p>
          <select
            value={props.tasksPerPage}
            onChange={props.handleTasksPerPage}
            id="tasksPerPage"
          >
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9">9</option>
          </select>
        </label>
      </div>
    </div>
  );
};
export default Filtering;
