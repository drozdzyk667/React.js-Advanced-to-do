import React, { Component } from "react";
import "./App.scss";

class App extends Component {
  state = {
    draft: "",
    taskType: "family",
    taskColor: { backgroundColor: "#57A1C4" },
    AddActive: false,
    priority: false,
    dateNow: null,
    date: "",
    fullDate: null,
    minimumDate: null,
    maximumDate: null,
    tasks: [
      {
        id: 1,
        name: "buy bread",
        priority: true,
        deadlineTask: "2019-09-10",
        type: "home",
        taskColor: { backgroundColor: "#9370DB" }
      },
      {
        id: 2,
        name: "buy petrol",
        priority: false,
        deadlineTask: "2019-08-22",
        type: "car",
        taskColor: { backgroundColor: "#92C1FF" }
      }
    ],
    devTasks: [],
    verifyTasks: [],
    done: [
      {
        id: 0,
        name: "eat pumpkin",
        priority: false,
        doneAt: "2019-06-22, 11:48 PM",
        type: "home",
        taskColor: { backgroundColor: "#9370DB" }
      }
    ]
  };

  componentDidMount() {
    this.currentTime();
  }

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

  handleClearAll = e => {
    const id = e.target.id;
    if (id === "tasks") {
      this.setState({
        [id]: []
      });
    } else if (id === "done") {
      this.setState({
        [id]: []
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

  handleAddTask = () => {
    const tasks = [
      ...this.state.tasks,
      {
        id: Math.random() * this.state.tasks.length,
        name: this.state.draft,
        priority: this.state.priority,
        deadlineTask: this.state.date,
        type: this.state.taskType,
        taskColor: this.state.taskColor
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
        taskType: "family",
        taskColor: { backgroundColor: "#57A1C4" },
        AddActive: false
      });
    } else {
      this.setState({
        AddActive: true
      });
    }
  };

  handlePushToDo = id => {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.id === id) {
        const index = tasks.findIndex(task => task.id === id);
        this.setState({
          tasks: tasks,
          devTasks: [
            ...this.state.devTasks,
            {
              id: Math.random() * this.state.devTasks.length,
              name: tasks[index].name,
              priority: tasks[index].priority,
              passedTime: this.state.fullDate,
              type: tasks[index].type,
              taskColor: tasks[index].taskColor
            }
          ].sort(this.sortToDoTasks("priority"))
        });

        tasks.splice(index, 1);
      }
    });
  };

  handlePushDev = id => {
    const tasks = [...this.state.devTasks];

    tasks.forEach(task => {
      if (task.id === id) {
        const index = tasks.findIndex(task => task.id === id);

        this.setState({
          devTasks: tasks,
          verifyTasks: [
            ...this.state.verifyTasks,
            {
              id: Math.random() * this.state.verifyTasks.length,
              name: tasks[index].name,
              priority: tasks[index].priority,
              passedTime: this.state.fullDate,
              type: tasks[index].type,
              taskColor: tasks[index].taskColor
            }
          ]
        });
        tasks.splice(index, 1);
      }
    });
  };

  handlePushVerify = id => {
    const tasks = [...this.state.verifyTasks];

    tasks.forEach(task => {
      if (task.id === id) {
        const index = tasks.findIndex(task => task.id === id);
        this.setState({
          verifyTasks: tasks,
          done: [
            ...this.state.done,
            {
              id: Math.random() * this.state.done.length,
              name: tasks[index].name,
              priority: tasks[index].priority,
              doneAt: this.state.fullDate,
              type: tasks[index].type,
              taskColor: tasks[index].taskColor
            }
          ]
        });
        tasks.splice(index, 1);
      }
    });
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

  handleDeleteToDo = id => {
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex(task => task.id === id);
    tasks.splice(index, 1);
    this.setState({
      tasks
    });
  };

  handleDeleteDone = id => {
    const tasksDone = [...this.state.done];
    const index = tasksDone.findIndex(task => task.id === id);
    tasksDone.splice(index, 1);
    this.setState({
      done: tasksDone
    });
  };

  handleDate = e => {
    this.setState({
      date: e.target.value
    });
  };

  handleSelect = e => {
    this.setState({
      taskType: e.target.value
    });
    if (e.target.value === "family") {
      this.setState({
        taskColor: { backgroundColor: "#57A1C4" }
      });
    } else if (e.target.value === "home") {
      this.setState({
        taskColor: { backgroundColor: "#9370DB" }
      });
    } else if (e.target.value === "work") {
      this.setState({
        taskColor: { backgroundColor: "#CBC8C8" }
      });
    } else if (e.target.value === "car") {
      this.setState({
        taskColor: { backgroundColor: "#92C1FF" }
      });
    } else if (e.target.value === "food") {
      this.setState({
        taskColor: { backgroundColor: "#68D384" }
      });
    } else if (e.target.value === "school") {
      this.setState({
        taskColor: { backgroundColor: "#E5AE3A" }
      });
    } else if (e.target.value === "others") {
      this.setState({
        taskColor: { backgroundColor: "#8F9A9F" }
      });
    }
  };

  render() {
    console.log(this.state.taskType);
    console.log(this.state.taskColor);

    const tasks = this.state.tasks.map(task => (
      <Task
        taskColor={task.taskColor}
        taskType={task.type}
        date={task.deadlineTask}
        priority={task.priority}
        key={task.id}
        name={task.name}
        delete={() => this.handleDeleteToDo(task.id)}
        done={() => this.handlePushToDo(task.id)}
      />
    ));

    const devTasks = this.state.devTasks.map(task => (
      <DevTasks
        taskColor={task.taskColor}
        taskType={task.type}
        date={task.passedTime}
        priority={task.priority}
        doneAt={task.doneAt}
        key={task.id}
        name={task.name}
        done={() => this.handlePushDev(task.id)}
      />
    ));

    const verifyTasks = this.state.verifyTasks.map(task => (
      <VerifiedTasks
        taskColor={task.taskColor}
        taskType={task.type}
        date={task.passedTime}
        priority={task.priority}
        doneAt={task.doneAt}
        key={task.id}
        name={task.name}
        done={() => this.handlePushVerify(task.id)}
      />
    ));

    const tasksDone = this.state.done.map(task => (
      <TaskDone
        taskColor={task.taskColor}
        taskType={task.type}
        date={task.doneAt}
        priority={task.priority}
        doneAt={task.doneAt}
        key={task.id}
        name={task.name}
        deleteDone={() => this.handleDeleteDone(task.id)}
      />
    ));

    return (
      <div className="App">
        <div className="InputArea">
          <div className="selectBox">
            <label htmlFor="choice">
              <b>Task type: </b>
              <select
                style={this.state.taskColor}
                value={this.state.taskType}
                onChange={this.handleSelect}
                id="choice"
              >
                <option value="family">Family</option>
                <option value="home">Home</option>
                <option value="work">Work</option>
                <option value="car">Car</option>
                <option value="food">Food</option>
                <option value="school">School</option>
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
          <label htmlFor="inp" className="inp">
            <input
              id="inp"
              type="text"
              name="draft"
              value={this.state.draft}
              onChange={this.handleInput}
              maxLength="30"
              placeholder="&nbsp;"
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
          <br />

          <br />
          <button
            id="addBtn"
            className="btn btn-primary"
            onClick={this.handleAddTask}
          >
            Add ✚
          </button>
          <p style={{ color: "red" }}>
            {this.state.AddActive && this.state.draft === ""
              ? `Fill task field firstly`
              : null}
          </p>
        </div>
        <hr />

        <div className="row" style={{ margin: 0 }}>
          <div className="col-xl-3" style={{ borderRight: "2px solid black" }}>
            <div className="TasksToDoHeader">
              <h2>Tasks to do ({this.state.tasks.length})</h2>{" "}
              <h6>
                <i>(ordered by priority & task type)</i>
              </h6>
              <button
                style={
                  this.state.tasks.length > 0
                    ? { visibility: "visible" }
                    : { visibility: "hidden" }
                }
                id="tasks"
                className="btn btn-danger"
                onClick={this.handleClearAll}
              >
                Delete all
              </button>
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
            <div className="TasksToDoContainers">{tasks}</div>
          </div>

          <div className="col-xl-3" style={{ borderRight: "2px solid black" }}>
            <div className="TasksToDoHeader">
              <h2>Developing ({this.state.devTasks.length})</h2>{" "}
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
            <div className="TasksToDoContainers">{devTasks}</div>
          </div>

          <div className="col-xl-3" style={{ borderRight: "2px solid black" }}>
            <div className="TasksToDoHeader">
              <h2>Veryfing ({this.state.verifyTasks.length})</h2>{" "}
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
            <div className="TasksToDoContainers">{verifyTasks}</div>
          </div>

          <div className="col-xl-3">
            <div className="TasksToDoHeader">
              <h2>Tasks Done ({this.state.done.length})</h2>{" "}
              <button
                style={
                  this.state.done.length > 0
                    ? { visibility: "visible" }
                    : { visibility: "hidden" }
                }
                id="done"
                className="btn btn-danger"
                onClick={this.handleClearAll}
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

const Task = props => {
  return (
    <div>
      <div className="singleTask" style={props.taskColor}>
        <div className="control-buttons">
          <button className="btn btn-success" onClick={props.done}>
            ✔
          </button>
          <button className="btn btn-danger" onClick={props.delete}>
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
        <i> {props.date ? `deadline: ${props.date}` : props.date}</i>
      </div>
    </div>
  );
};

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
      </div>
    </div>
  );
};

const VerifiedTasks = props => {
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
      </div>
    </div>
  );
};

const TaskDone = props => {
  return (
    <div>
      <div className="singleTask" style={props.taskColor}>
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
      </div>
    </div>
  );
};

export default App;
