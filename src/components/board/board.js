import React, { Component } from "react";
import ColumnTasksToDo from "./taskList/columnToDo";
import ColumnDev from "./taskList/columnDev";
import ColumnVerify from "./taskList/columnVerify";
import ColumnDone from "./taskList/columnDone";
import "./board.scss";

class Board extends Component {
  // Logic for displaying current tasks in pagination on each column
  PaginationHandle = (pageTasks, perPage, filterTasks) => {
    const indexOfLastTasks = pageTasks * perPage;
    const indexOfFirstTasks = indexOfLastTasks - perPage;
    let current1 = [...filterTasks];
    return current1.slice(indexOfFirstTasks, indexOfLastTasks);
  };

  // Logic for displaying page numbers on each column
  NumberOfPages = (filterTasks, perPage, array) => {
    for (let i = 1; i <= Math.ceil([...filterTasks].length / perPage); i++) {
      array.push(i);
    }
  };

  render() {
    const {
      filterType,
      tasks,
      devTasks,
      verifyTasks,
      done,
      acceptRefuse,
      handleClickPage,
      handleAcceptRefuse,
      handleDelete,
      handlePush,
      currentPageDev,
      currentPageDone,
      currentPageTasks,
      currentPageVerify,
      tasksPerPage
    } = this.props;

    let filtertaskTasks;
    let filtertaskDev;
    let filtertaskVerify;
    let filtertaskDone;

    const pageNumbers1 = [];
    const pageNumbers2 = [];
    const pageNumbers3 = [];
    const pageNumbers4 = [];

    switch (filterType) {
      case "Review":
        filtertaskTasks = tasks.filter(task => task.type === "Review");
        filtertaskDev = devTasks.filter(task => task.type === "Review");
        filtertaskVerify = verifyTasks.filter(task => task.type === "Review");
        filtertaskDone = done.filter(task => task.type === "Review");
        break;
      case "Code":
        filtertaskTasks = tasks.filter(task => task.type === "Code");
        filtertaskDev = devTasks.filter(task => task.type === "Code");
        filtertaskVerify = verifyTasks.filter(task => task.type === "Code");
        filtertaskDone = done.filter(task => task.type === "Code");
        break;
      case "Test":
        filtertaskTasks = tasks.filter(task => task.type === "Test");
        filtertaskDev = devTasks.filter(task => task.type === "Test");
        filtertaskVerify = verifyTasks.filter(task => task.type === "Test");
        filtertaskDone = done.filter(task => task.type === "Test");
        break;
      case "Document":
        filtertaskTasks = tasks.filter(task => task.type === "Document");
        filtertaskDev = devTasks.filter(task => task.type === "Document");
        filtertaskVerify = verifyTasks.filter(task => task.type === "Document");
        filtertaskDone = done.filter(task => task.type === "Document");
        break;
      case "Analyze":
        filtertaskTasks = tasks.filter(task => task.type === "Analyze");
        filtertaskDev = devTasks.filter(task => task.type === "Analyze");
        filtertaskVerify = verifyTasks.filter(task => task.type === "Analyze");
        filtertaskDone = done.filter(task => task.type === "Analyze");
        break;
      case "Fix":
        filtertaskTasks = tasks.filter(task => task.type === "Fix");
        filtertaskDev = devTasks.filter(task => task.type === "Fix");
        filtertaskVerify = verifyTasks.filter(task => task.type === "Fix");
        filtertaskDone = done.filter(task => task.type === "Fix");
        break;
      case "Others":
        filtertaskTasks = tasks.filter(task => task.type === "Others");
        filtertaskDev = devTasks.filter(task => task.type === "Others");
        filtertaskVerify = verifyTasks.filter(task => task.type === "Others");
        filtertaskDone = done.filter(task => task.type === "Others");
        break;
      default:
        filtertaskTasks = tasks.filter(task => task.type !== "All");
        filtertaskDev = devTasks.filter(task => task.type !== "All");
        filtertaskVerify = verifyTasks.filter(task => task.type !== "All");
        filtertaskDone = done.filter(task => task.type !== "All");
        break;
    }

    const currentTasks1 = this.PaginationHandle(
      currentPageTasks,
      tasksPerPage,
      filtertaskTasks
    );
    const currentTasks2 = this.PaginationHandle(
      currentPageDev,
      tasksPerPage,
      filtertaskDev
    );
    const currentTasks3 = this.PaginationHandle(
      currentPageVerify,
      tasksPerPage,
      filtertaskVerify
    );
    const currentTasks4 = this.PaginationHandle(
      currentPageDone,
      tasksPerPage,
      filtertaskDone
    );

    this.NumberOfPages(filtertaskTasks, tasksPerPage, pageNumbers1);
    this.NumberOfPages(filtertaskDev, tasksPerPage, pageNumbers2);
    this.NumberOfPages(filtertaskVerify, tasksPerPage, pageNumbers3);
    this.NumberOfPages(filtertaskDone, tasksPerPage, pageNumbers4);

    return (
      <div className="row">
        <ColumnTasksToDo
          tasks={this.props.tasks}
          pageNumbers1={pageNumbers1}
          currentTasks1={currentTasks1}
          deleteAll={this.props.deleteAll}
          acceptRefuseStatus={acceptRefuse}
          acceptRefuse={handleAcceptRefuse}
          handleDelete={handleDelete}
          handlePush={handlePush}
          devTasks={this.props.devTasks}
          handleClickPage={handleClickPage}
        />
        <ColumnDev
          devTasks={this.props.devTasks}
          pageNumbers2={pageNumbers2}
          handleClickPage={handleClickPage}
          currentTasks2={currentTasks2}
          handlePush={handlePush}
          verifyTasks={this.props.verifyTasks}
        />
        <ColumnVerify
          verifyTasks={this.props.verifyTasks}
          pageNumbers3={pageNumbers3}
          currentTasks3={currentTasks3}
          done={this.props.done}
          handlePush={handlePush}
          handleClickPage={handleClickPage}
        />
        <ColumnDone
          done={this.props.done}
          pageNumbers4={pageNumbers4}
          currentTasks4={currentTasks4}
          deleteAll={this.props.deleteAll}
          handleClickPage={handleClickPage}
          handleDelete={handleDelete}
        />
      </div>
    );
  }
}
export default Board;
