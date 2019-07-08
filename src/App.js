import React, { Component } from "react";
import TaskToDo from "./components/taskToDo";
import DevTasks from "./components/devTasks";
import VerifiedTasks from "./components/verifiedTasks";
import TaskDone from "./components/taskDone";
import Blobs from "./components/blobs";
import InputArea from "./components/inputArea";
import Filtering from "./components/filtering";
import "./App.scss";

class App extends Component {
  state = {
    draft: "",
    taskType: "review",
    filterType: "all",
    taskColor: { backgroundColor: "#57A1C4" },
    filterColor: { backgroundColor: "#FAA" },
    AddActive: false,
    acceptRefuse: false,
    priority: false,
    dateNow: null,
    date: "",
    fullDate: null,
    minimumDate: null,
    maximumDate: null,
    currentPageTasks: 1,
    currentPageDev: 1,
    currentPageVerify: 1,
    currentPageDone: 1,
    tasksPerPage: 3,
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
    let day = date.getDate();

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

  handleClickPage = (e, array) => {
    const { tasks, done, devTasks, verifyTasks } = this.state;

    if (array === tasks) {
      this.setState({
        currentPageTasks: e.target.id
      });
    } else if (array === devTasks) {
      this.setState({
        currentPageDev: e.target.id
      });
    } else if (array === verifyTasks) {
      this.setState({
        currentPageVerify: e.target.id
      });
    } else if (array === done) {
      this.setState({
        currentPageDone: e.target.id
      });
    }
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

  handleAcceptRefuse = () => {
    this.setState({
      acceptRefuse: !this.state.acceptRefuse
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
    const arrCopy = [...firstArray];

    const index = arrCopy.findIndex(task => task.id === id);
    const { name, priority, deadlineTask, type, taskColor } = arrCopy[index];
    const {
      tasks,
      devTasks,
      verifyTasks,
      done,
      currentPageDev,
      currentPageDone,
      currentPageTasks,
      currentPageVerify
    } = this.state;

    const filterTask = arrCopy.filter(task => task.id !== id);
    const data = {
      id: Math.random() * secondArray.length,
      name: name,
      priority: priority,
      deadlineTask: deadlineTask,
      passedTime: this.state.fullDate,
      type: type,
      taskColor: taskColor
    };

    if (firstArray === tasks && secondArray.length < 30) {
      this.setState({
        tasks: filterTask,
        devTasks: [...secondArray, data]
      });
    } else if (firstArray === devTasks && secondArray.length < 30) {
      this.setState({
        devTasks: filterTask,
        verifyTasks: [...secondArray, data]
      });
    } else if (firstArray === verifyTasks && secondArray.length < 30) {
      this.setState({
        verifyTasks: filterTask,
        done: [...secondArray, data]
      });
    }

    if (tasks.length === 4) {
      this.setState({
        currentPageTasks: 1
      });
    } else if (tasks.length % 3 === 1 && currentPageTasks > 1) {
      this.setState({
        currentPageTasks: currentPageTasks - 1
      });
    }

    if (devTasks.length === 4) {
      this.setState({
        currentPageDev: 1
      });
    } else if (devTasks.length % 3 === 1 && currentPageDev > 1) {
      this.setState({
        currentPageDev: currentPageDev - 1
      });
    }

    if (verifyTasks.length === 4) {
      this.setState({
        currentPageVerify: 1
      });
    } else if (verifyTasks.length % 3 === 1 && currentPageVerify > 1) {
      this.setState({
        currentPageVerify: currentPageVerify - 1
      });
    }

    if (done.length === 4) {
      this.setState({
        currentPageDone: 1
      });
    } else if (done.length % 3 === 1 && currentPageDone > 1) {
      this.setState({
        currentPageDone: currentPageDone - 1
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
    const { tasks, currentPageTasks, currentPageDone, done } = this.state;

    const arrCopy = [...array];
    const filterTask = arrCopy.filter(task => task.id !== id);
    if (array === tasks) {
      this.setState({
        tasks: filterTask
      });
    } else if (array === done) {
      this.setState({
        done: filterTask
      });
    }

    if (tasks.length === 4) {
      this.setState({
        currentPageTasks: 1
      });
    } else if (tasks.length % 3 === 1 && currentPageTasks > 1) {
      this.setState({
        currentPageTasks: currentPageTasks - 1
      });
    }

    if (done.length === 4) {
      this.setState({
        currentPageDone: 1
      });
    } else if (done.length % 3 === 1 && currentPageDone > 1) {
      this.setState({
        currentPageDone: currentPageDone - 1
      });
    }
  };

  handleDeleteAll = e => {
    const id = e.target.id;
    if (id === "tasks") {
      this.setState({
        [id]: [],
        currentPageTasks: 1
      });
    } else if (id === "done") {
      this.setState({
        [id]: [],
        currentPageDone: 1
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
      currentPageTasks: 1,
      currentPageDev: 1,
      currentPageVerify: 1,
      currentPageDone: 1
    });
  };

  handleTasksPerPage = e => {
    this.setState({
      tasksPerPage: e.target.value,
      currentPageTasks: 1,
      currentPageDev: 1,
      currentPageVerify: 1,
      currentPageDone: 1
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

    const {
      currentPageDev,
      currentPageDone,
      currentPageTasks,
      currentPageVerify,
      tasksPerPage
    } = this.state;

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

    const renderPageNumbers1 = pageNumbers1.map(number => {
      return (
        <button
          className="paginat btn btn-info btn-sm"
          key={number}
          id={number}
          onClick={e => {
            this.handleClickPage(e, this.state.tasks);
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
            this.handleClickPage(e, this.state.devTasks);
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
            this.handleClickPage(e, this.state.verifyTasks);
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
            this.handleClickPage(e, this.state.done);
          }}
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
        acceptRefuseStatus={this.state.acceptRefuse}
        acceptRefuse={this.handleAcceptRefuse}
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
        <Blobs />

        <InputArea
          input={this.handleInput}
          enter={this.handleEnter}
          draft={this.state.draft}
          priority={this.state.priority}
          priorityStatus={this.handlePriority}
          addTask={this.handleAddTask}
          addActive={this.state.AddActive}
          color={this.state.taskColor}
          type={this.state.taskType}
          select={this.handleSelect}
          date={this.state.date}
          handleDate={this.handleDate}
          minimumDate={this.state.minimumDate}
          maximumDate={this.state.maximumDate}
        />

        <Filtering
          filterType={this.state.filterType}
          filterAll={this.handleFilterAll}
          tasksPerPage={this.state.tasksPerPage}
          handleTasksPerPage={this.handleTasksPerPage}
        />

        <hr />

        <div className="row">
          <div className="col-xl-3">
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
                    pageNumbers1.length < 2
                      ? { display: "none" }
                      : { display: "block" }
                  }
                >
                  {renderPageNumbers1}
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

          <div className="col-xl-3">
            <div className="TasksToDoHeader">
              <h2
                style={
                  this.state.devTasks.length === 30 ? { color: "red" } : null
                }
              >
                Dev ({this.state.devTasks.length})
                <i style={{ fontSize: "18px" }}>/30 </i>
              </h2>
              <div>
                <b
                  id="page-numbers"
                  style={
                    pageNumbers2.length < 2
                      ? { display: "none" }
                      : { display: "block" }
                  }
                >
                  {renderPageNumbers2}
                </b>
              </div>
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

          <div className="col-xl-3">
            <div className="TasksToDoHeader">
              <h2
                style={
                  this.state.verifyTasks.length === 30 ? { color: "red" } : null
                }
              >
                Test ({this.state.verifyTasks.length})
                <i style={{ fontSize: "18px" }}>/30 </i>
              </h2>
              <div>
                <b
                  id="page-numbers"
                  style={
                    pageNumbers3.length < 2
                      ? { display: "none" }
                      : { display: "block" }
                  }
                >
                  {renderPageNumbers3}
                </b>
              </div>
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
                Done ({this.state.done.length})
                <i style={{ fontSize: "18px" }}>/30 </i>
              </h2>
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
              <div>
                <b
                  id="page-numbers"
                  style={
                    pageNumbers4.length < 2
                      ? { display: "none" }
                      : { display: "block" }
                  }
                >
                  {renderPageNumbers4}
                </b>
              </div>
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
