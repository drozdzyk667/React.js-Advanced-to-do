import React, { Component } from "react";

import Blobs from "./components/blobs/blobs";
import InputArea from "./components/inputArea/inputArea";
import Filtering from "./components/filtering/filtering";
import Board from "./components/board/board";
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

        <Board
          currentPageDev={this.state.currentPageDev}
          currentPageDone={this.state.currentPageDone}
          currentPageTasks={this.state.currentPageTasks}
          currentPageVerify={this.state.currentPageVerify}
          tasksPerPage={this.state.tasksPerPage}
          handleClickPage={this.handleClickPage}
          tasks={this.state.tasks}
          deleteAll={this.handleDeleteAll}
          devTasks={this.state.devTasks}
          verifyTasks={this.state.verifyTasks}
          done={this.state.done}
          filterType={this.state.filterType}
          acceptRefuseStatus={this.state.acceptRefuse}
          acceptRefuse={this.handleAcceptRefuse}
          handlePush={this.handlePush}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;
