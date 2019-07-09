import React from "react";
import "./filtering.scss";

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
            <option value="all">All</option>
            <option value="review">Review</option>
            <option value="code">Code</option>
            <option value="test">Test</option>
            <option value="doc">Document</option>
            <option value="analyze">Analyze</option>
            <option value="fix">Fix</option>
            <option value="others">Others</option>
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
