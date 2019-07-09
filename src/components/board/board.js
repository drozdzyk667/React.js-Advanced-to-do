import React, { Component } from "react";
import TaskToDo from "./taskElements/taskToDo";
import DevTasks from "./taskElements/devTasks";
import VerifiedTasks from "./taskElements/verifiedTasks";
import TaskDone from "./taskElements/taskDone";
import ColumnTasksToDo from "./taskList/columnToDo";
import ColumnDev from "./taskList/columnDev";
import ColumnVerify from "./taskList/columnVerify";
import ColumnDone from "./taskList/columnDone";
import "./board.scss";

class Board extends Component {
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

    switch (filterType) {
      case "review":
        filtertaskTasks = tasks.filter(task => task.type === "review");
        filtertaskDev = devTasks.filter(task => task.type === "review");
        filtertaskVerify = verifyTasks.filter(task => task.type === "review");
        filtertaskDone = done.filter(task => task.type === "review");
        break;
      case "code":
        filtertaskTasks = tasks.filter(task => task.type === "code");
        filtertaskDev = devTasks.filter(task => task.type === "code");
        filtertaskVerify = verifyTasks.filter(task => task.type === "code");
        filtertaskDone = done.filter(task => task.type === "code");
        break;
      case "test":
        filtertaskTasks = tasks.filter(task => task.type === "test");
        filtertaskDev = devTasks.filter(task => task.type === "test");
        filtertaskVerify = verifyTasks.filter(task => task.type === "test");
        filtertaskDone = done.filter(task => task.type === "test");
        break;
      case "doc":
        filtertaskTasks = tasks.filter(task => task.type === "doc");
        filtertaskDev = devTasks.filter(task => task.type === "doc");
        filtertaskVerify = verifyTasks.filter(task => task.type === "doc");
        filtertaskDone = done.filter(task => task.type === "doc");
        break;
      case "analyze":
        filtertaskTasks = tasks.filter(task => task.type === "analyze");
        filtertaskDev = devTasks.filter(task => task.type === "analyze");
        filtertaskVerify = verifyTasks.filter(task => task.type === "analyze");
        filtertaskDone = done.filter(task => task.type === "analyze");
        break;
      case "fix":
        filtertaskTasks = tasks.filter(task => task.type === "fix");
        filtertaskDev = devTasks.filter(task => task.type === "fix");
        filtertaskVerify = verifyTasks.filter(task => task.type === "fix");
        filtertaskDone = done.filter(task => task.type === "fix");
        break;
      case "others":
        filtertaskTasks = tasks.filter(task => task.type === "others");
        filtertaskDev = devTasks.filter(task => task.type === "others");
        filtertaskVerify = verifyTasks.filter(task => task.type === "others");
        filtertaskDone = done.filter(task => task.type === "others");
        break;
      default:
        filtertaskTasks = tasks.filter(task => task.type !== "all");
        filtertaskDev = devTasks.filter(task => task.type !== "all");
        filtertaskVerify = verifyTasks.filter(task => task.type !== "all");
        filtertaskDone = done.filter(task => task.type !== "all");
        break;
    }

    // Logic for displaying current tasks in pagination on each column
    const indexOfLastTasks = currentPageTasks * tasksPerPage;
    const indexOfFirstTasks = indexOfLastTasks - tasksPerPage;
    let current1 = [...filtertaskTasks];
    const currentTasks = current1.slice(indexOfFirstTasks, indexOfLastTasks);

    const indexOfLastDev = currentPageDev * tasksPerPage;
    const indexOfFirstDev = indexOfLastDev - tasksPerPage;
    let current2 = [...filtertaskDev];
    const currentDev = current2.slice(indexOfFirstDev, indexOfLastDev);

    const indexOfLastVerify = currentPageVerify * tasksPerPage;
    const indexOfFirstVerify = indexOfLastVerify - tasksPerPage;
    let current3 = [...filtertaskVerify];
    const currentVerify = current3.slice(indexOfFirstVerify, indexOfLastVerify);

    const indexOfLastDone = currentPageDone * tasksPerPage;
    const indexOfFirstDone = indexOfLastDone - tasksPerPage;
    let current4 = [...filtertaskDone];
    const currentDone = current4.slice(indexOfFirstDone, indexOfLastDone);

    // Logic for displaying page numbers on each column
    const pageNumbers1 = [];
    for (let i = 1; i <= Math.ceil(current1.length / tasksPerPage); i++) {
      pageNumbers1.push(i);
    }

    const pageNumbers2 = [];
    for (let i = 1; i <= Math.ceil(current2.length / tasksPerPage); i++) {
      pageNumbers2.push(i);
    }

    const pageNumbers3 = [];
    for (let i = 1; i <= Math.ceil(current3.length / tasksPerPage); i++) {
      pageNumbers3.push(i);
    }

    const pageNumbers4 = [];
    for (let i = 1; i <= Math.ceil(current4.length / tasksPerPage); i++) {
      pageNumbers4.push(i);
    }

    const tasksToDo = currentTasks.map(task => (
      <TaskToDo
        taskColor={task.taskColor}
        taskType={task.type}
        deadline={task.deadlineTask}
        priority={task.priority}
        key={task.id}
        acceptRefuseStatus={acceptRefuse}
        acceptRefuse={handleAcceptRefuse}
        name={task.name}
        delete={() => handleDelete(task.id, tasks)}
        done={() => handlePush(task.id, tasks, devTasks)}
      />
    ));

    const dev = currentDev.map(task => (
      <DevTasks
        taskColor={task.taskColor}
        taskType={task.type}
        deadline={task.deadlineTask}
        date={task.passedTime}
        priority={task.priority}
        key={task.id}
        name={task.name}
        done={() => handlePush(task.id, devTasks, verifyTasks)}
      />
    ));

    const verify = currentVerify.map(task => (
      <VerifiedTasks
        taskColor={task.taskColor}
        taskType={task.type}
        deadline={task.deadlineTask}
        date={task.passedTime}
        priority={task.priority}
        key={task.id}
        name={task.name}
        done={() => handlePush(task.id, verifyTasks, done)}
      />
    ));

    const tasksDone = currentDone.map(task => (
      <TaskDone
        taskColor={task.taskColor}
        taskType={task.type}
        deadline={task.deadlineTask}
        date={task.passedTime}
        priority={task.priority}
        key={task.id}
        name={task.name}
        deleteDone={() => handleDelete(task.id, done)}
      />
    ));

    const renderPageNumbers1 = pageNumbers1.map(number => {
      return (
        <button
          className="paginat btn btn-info btn-sm"
          key={number}
          id={number}
          onClick={e => {
            handleClickPage(e, tasks);
          }}
        >
          {number}
        </button>
      );
    });

    const renderPageNumbers2 = pageNumbers2.map(number => {
      return (
        <button
          className="paginat btn btn-info btn-sm"
          key={number}
          id={number}
          onClick={e => {
            handleClickPage(e, devTasks);
          }}
        >
          {number}
        </button>
      );
    });

    const renderPageNumbers3 = pageNumbers3.map(number => {
      return (
        <button
          className="paginat btn btn-info btn-sm"
          key={number}
          id={number}
          onClick={e => {
            handleClickPage(e, verifyTasks);
          }}
        >
          {number}
        </button>
      );
    });

    const renderPageNumbers4 = pageNumbers4.map(number => {
      return (
        <button
          className="paginat btn btn-info btn-sm"
          key={number}
          id={number}
          onClick={e => {
            handleClickPage(e, done);
          }}
        >
          {number}
        </button>
      );
    });
    return (
      <div className="row">
        <ColumnTasksToDo
          tasks={this.props.tasks}
          pageNumbers1={pageNumbers1}
          renderPageNumbers1={renderPageNumbers1}
          tasksToDo={tasksToDo}
          deleteAll={this.props.deleteAll}
        />
        <ColumnDev
          devTasks={this.props.devTasks}
          pageNumbers2={pageNumbers2}
          renderPageNumbers2={renderPageNumbers2}
          dev={dev}
        />
        <ColumnVerify
          verifyTasks={this.props.verifyTasks}
          pageNumbers3={pageNumbers3}
          renderPageNumbers3={renderPageNumbers3}
          verify={verify}
        />
        <ColumnDone
          done={this.props.done}
          pageNumbers4={pageNumbers4}
          renderPageNumbers4={renderPageNumbers4}
          tasksDone={tasksDone}
          deleteAll={this.props.deleteAll}
        />
      </div>
    );
  }
}
export default Board;
