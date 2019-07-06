import React, { Component } from "react";
import TaskToDo from "./components/taskToDo";
import DevTasks from "./components/devTasks";
import VerifiedTasks from "./components/verifiedTasks";
import TaskDone from "./components/taskDone";
import "./App.scss";
import workTable from "./work-table.png";

class App extends Component {
  state = {
    draft: "",
    taskType: "review",
    filterType: "all",
    taskColor: { backgroundColor: "#57A1C4" },
    filterColor: { backgroundColor: "#FAA" },
    AddActive: false,
    priority: false,
    dateNow: null,
    date: "",
    fullDate: null,
    minimumDate: null,
    maximumDate: null,
    currentPage: 1,
    tasksPerPage: 5,
    pageNumbers: [],
    tasks: [
      {
        id: 1,
        name: "function to solve problem with ...",
        priority: true,
        deadlineTask: "2019-09-10",
        type: "code",
        taskColor: { backgroundColor: "#9370DB" }
      },
      {
        id: 2,
        name: "write report about ... issue",
        priority: false,
        deadlineTask: "2019-08-22",
        type: "doc",
        taskColor: { backgroundColor: "#92C1FF" }
      }
    ],
    devTasks: [],
    verifyTasks: [],
    done: [
      {
        id: 0,
        name: "display data from ...",
        priority: false,
        deadlineTask: "2019-08-22",
        passedTime: "2019-06-22, 11:48 PM",
        type: "code",
        taskColor: { backgroundColor: "#9370DB" }
      }
    ]
  };

  componentDidMount() {
    this.currentTime();
  }

  handleDate = e => {
    this.setState({
      date: e.target.value
    });
  };

  currentTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDay();

    const time = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    this.setState({
      dateNow: `${year}-${month}-${day}`,
      date: `${year}-${month}-${day}`,
      minimumDate: `${year}-${month}-${day}`,
      maximumDate: `${year + 1}-${month}-${day}`,
      fullDate: `${year}-${month}-${day}, ${time}`
    });
  };

  handleClickPage = e => {
    this.setState({
      currentPage: Number(e.target.id)
    });
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handlePriority = () => {
    this.setState({
      priority: !this.state.priority
    });
  };

  handleEnter = e => {
    if (e.key === "Enter") {
      this.handleAddTask();
    }
  };

  handleAddTask = () => {
    const { draft, priority, date, taskType, taskColor } = this.state;
    if (this.state.tasks.length < 30) {
      const tasks = [
        ...this.state.tasks,
        {
          id: Math.random() * this.state.tasks.length,
          name: draft,
          priority: priority,
          deadlineTask: date,
          type: taskType,
          taskColor: taskColor
        }
      ]
        .sort(this.sortToDoTasks("priority"))
        .sort(this.sortToDoTasks("type"));

      if (this.state.draft !== "") {
        this.setState({
          tasks: tasks.reverse(),
          draft: "",
          priority: false,
          date: this.state.dateNow,
          taskType: "review",
          taskColor: { backgroundColor: "#57A1C4" },
          AddActive: false
        });
      } else {
        this.setState({
          AddActive: true
        });
      }
    }
  };

  handlePush = (id, firstArray, secondArray) => {
    const tasks = [...firstArray];

    const index = tasks.findIndex(task => task.id === id);
    const { name, priority, deadlineTask, type, taskColor } = tasks[index];

    const filterTask = tasks.filter(task => task.id !== id);
    const data = {
      id: Math.random() * secondArray.length,
      name: name,
      priority: priority,
      deadlineTask: deadlineTask,
      passedTime: this.state.fullDate,
      type: type,
      taskColor: taskColor
    };

    if (firstArray === this.state.tasks && secondArray.length < 30) {
      this.setState({
        tasks: filterTask,
        devTasks: [...secondArray, data]
      });
    } else if (firstArray === this.state.devTasks && secondArray.length < 30) {
      this.setState({
        devTasks: filterTask,
        verifyTasks: [...secondArray, data]
      });
    } else if (
      firstArray === this.state.verifyTasks &&
      secondArray.length < 30
    ) {
      this.setState({
        verifyTasks: filterTask,
        done: [...secondArray, data]
      });
    }
  };

  sortToDoTasks = property => {
    let sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return (a, b) => {
      let result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };

  handleDelete = (id, array) => {
    const tasks = [...array];
    const filterTask = tasks.filter(task => task.id !== id);
    if (array === this.state.tasks) {
      this.setState({
        tasks: filterTask
      });
    } else if (array === this.state.done) {
      this.setState({
        done: filterTask
      });
    }

    if (this.state.tasks.length === 4) {
      this.setState({
        currentPage: 1
      });
    } else if (
      this.state.tasks.length % 3 === 1 &&
      this.state.currentPage !== 1
    ) {
      this.setState({
        currentPage: this.state.currentPage - 1
      });
    }
  };

  handleDeleteAll = e => {
    const id = e.target.id;
    if (id === "tasks") {
      this.setState({
        [id]: [],
        currentPage: 1
      });
    } else if (id === "done") {
      this.setState({
        [id]: []
      });
    }
  };

  handleSelect = e => {
    this.setState({
      taskType: e.target.value
    });

    switch (e.target.value) {
      case "review":
        return this.setState({
          taskColor: { backgroundColor: "#57A1C4" }
        });
      case "code":
        return this.setState({
          taskColor: { backgroundColor: "#9370DB" }
        });
      case "test":
        return this.setState({
          taskColor: { backgroundColor: "#CBC8C8" }
        });
      case "doc":
        return this.setState({
          taskColor: { backgroundColor: "#92C1FF" }
        });
      case "analyze":
        return this.setState({
          taskColor: { backgroundColor: "#68D384" }
        });
      case "fix":
        return this.setState({
          taskColor: { backgroundColor: "#E5AE3A" }
        });
      case "others":
        return this.setState({
          taskColor: { backgroundColor: "#8F9A9F" }
        });
      default:
        return this.setState({
          taskColor: { backgroundColor: "black" }
        });
    }
  };

  handleFilterAll = e => {
    this.setState({
      filterType: e.target.value,
      currentPage: 1
    });
  };

  render() {
    const { filterType, tasks, devTasks, verifyTasks, done } = this.state;

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

    const { currentPage, tasksPerPage } = this.state;

    // Logic for displaying current tasks in pagination
    const indexOfLastTasks = currentPage * tasksPerPage;
    const indexOfFirstTasks = indexOfLastTasks - tasksPerPage;

    let current1 = [...filtertaskTasks];
    const currentTasks = current1.slice(indexOfFirstTasks, indexOfLastTasks);

    let current2 = [...filtertaskDev];
    const currentDev = current2.slice(indexOfFirstTasks, indexOfLastTasks);

    let current3 = [...filtertaskVerify];
    const currentVerify = current3.slice(indexOfFirstTasks, indexOfLastTasks);

    let current4 = [...filtertaskDone];
    const currentDone = current4.slice(indexOfFirstTasks, indexOfLastTasks);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(current1.length / tasksPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <button
          className="paginat btn btn-info btn-sm"
          key={number}
          id={number}
          onClick={this.handleClickPage}
        >
          {number}
        </button>
      );
    });

    const tasksToDo = currentTasks.map(task => (
      <TaskToDo
        taskColor={task.taskColor}
        taskType={task.type}
        deadline={task.deadlineTask}
        priority={task.priority}
        key={task.id}
        name={task.name}
        delete={() => this.handleDelete(task.id, this.state.tasks)}
        done={() =>
          this.handlePush(task.id, this.state.tasks, this.state.devTasks)
        }
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
        done={() =>
          this.handlePush(task.id, this.state.devTasks, this.state.verifyTasks)
        }
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
        done={() =>
          this.handlePush(task.id, this.state.verifyTasks, this.state.done)
        }
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
        deleteDone={() => this.handleDelete(task.id, this.state.done)}
      />
    ));

    return (
      <div className="App">
        <div className="InputArea">
          <h2>Your Scrum Board</h2>
          <div className="inputField">
            <label htmlFor="inp" className="inp">
              <input
                id="inp"
                type="text"
                name="draft"
                value={this.state.draft}
                onChange={this.handleInput}
                maxLength="30"
                placeholder="&nbsp;"
                onKeyPress={this.handleEnter}
              />
              <span className="label">Input task</span>
              <span className="border" />
            </label>

            <div className="squaredCheckbox">
              <label htmlFor="checkb">
                <input
                  type="checkbox"
                  id="checkb"
                  checked={this.state.priority}
                  onChange={this.handlePriority}
                />
                <label htmlFor="mark" />
                <i>High priority</i>
              </label>
            </div>

            <div className="AddBtnContainer">
              <button
                id="addBtn"
                className="btn btn-primary"
                onClick={this.handleAddTask}
              >
                Add ✚
              </button>
              <p>
                {this.state.AddActive && this.state.draft === ""
                  ? `Fill task field firstly`
                  : null}
              </p>
            </div>
          </div>

          <div className="selectBox">
            <label htmlFor="choice">
              <p>Task type: </p>
              <select
                style={this.state.taskColor}
                value={this.state.taskType}
                onChange={this.handleSelect}
                id="choice"
              >
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

          <div className="deadlineDate">
            <label htmlFor="date">
              <p>Deadline date: </p>
              <input
                id="date"
                type="date"
                value={this.state.date}
                min={this.state.minimumDate}
                max={this.state.maximumDate}
                onChange={this.handleDate}
              />
            </label>
          </div>

          <img src={workTable} alt="work-table" />
        </div>

        <div className="selectBox">
          <label htmlFor="filter">
            <p>Filter: </p>
            <select
              value={this.state.filterType}
              onChange={this.handleFilterAll}
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
        <hr />

        <div className="row" style={{ margin: 0 }}>
          <div className="col-xl-3" style={{ borderRight: "2px solid black" }}>
            <div className="TasksToDoHeader">
              <h2
                style={this.state.tasks.length === 30 ? { color: "red" } : null}
              >
                To do ({this.state.tasks.length})
                <i style={{ fontSize: "18px" }}>/30 </i>
              </h2>{" "}
              <h6>
                <i>(ordered by task type and priority in there)</i>
              </h6>
              <button
                style={
                  this.state.tasks.length > 0
                    ? { visibility: "visible" }
                    : { visibility: "hidden" }
                }
                id="tasks"
                className="btn btn-danger"
                onClick={this.handleDeleteAll}
              >
                Delete all
              </button>
              <div>
                <b
                  id="page-numbers"
                  style={
                    pageNumbers.length < 2
                      ? { display: "none" }
                      : { display: "block" }
                  }
                >
                  {renderPageNumbers}
                </b>
              </div>
              <h3
                style={
                  this.state.tasks.length > 0
                    ? { display: "none" }
                    : { display: "block", color: "red" }
                }
              >
                <i>None tasks to be done !</i>
              </h3>
            </div>
            <div className="TasksToDoContainers">{tasksToDo}</div>
          </div>

          <div className="col-xl-3" style={{ borderRight: "2px solid black" }}>
            <div className="TasksToDoHeader">
              <h2
                style={
                  this.state.devTasks.length === 30 ? { color: "red" } : null
                }
              >
                To do ({this.state.devTasks.length})
                <i style={{ fontSize: "18px" }}>/30 </i>
              </h2>{" "}
              <h3
                style={
                  this.state.devTasks.length > 0
                    ? { display: "none" }
                    : { display: "block", color: "red" }
                }
              >
                <i>None tasks to be developed !</i>
              </h3>
            </div>
            <div className="TasksToDoContainers">{dev}</div>
          </div>

          <div className="col-xl-3" style={{ borderRight: "2px solid black" }}>
            <div className="TasksToDoHeader">
              <h2
                style={
                  this.state.verifyTasks.length === 30 ? { color: "red" } : null
                }
              >
                To do ({this.state.verifyTasks.length})
                <i style={{ fontSize: "18px" }}>/30 </i>
              </h2>{" "}
              <h3
                style={
                  this.state.verifyTasks.length > 0
                    ? { display: "none" }
                    : { display: "block", color: "red" }
                }
              >
                <i>None tasks to be verified !</i>
              </h3>
            </div>
            <div className="TasksToDoContainers">{verify}</div>
          </div>

          <div className="col-xl-3">
            <div className="TasksToDoHeader">
              <h2
                style={this.state.done.length === 30 ? { color: "red" } : null}
              >
                To do ({this.state.done.length})
                <i style={{ fontSize: "18px" }}>/30 </i>
              </h2>{" "}
              <button
                style={
                  this.state.done.length > 0
                    ? { visibility: "visible" }
                    : { visibility: "hidden" }
                }
                id="done"
                className="btn btn-danger"
                onClick={this.handleDeleteAll}
              >
                Delete all
              </button>
              <h3
                style={
                  this.state.done.length > 0
                    ? { display: "none" }
                    : { display: "block", color: "red" }
                }
              >
                <i>None task is done !</i>
              </h3>
            </div>
            <div className="TasksToDoContainers">{tasksDone}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
