import React, { Component } from "react";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.loadTasks = this.loadTasks.bind(this);
  }

  loadTasks() {
    fetch("flowable-task/process-api/runtime/tasks")
      .then(r => r.json().then(d => this.setState({ tasks: d.data })))
      .catch(error => console.error(error));
  }
  render() {
    this.loadTasks();

    return (
      <div className="sidebar">
        <div className="sidebar-title">Taks</div>
        <ul>
          {this.state &&
            this.state.tasks &&
            this.state.tasks.map(t => (
              <li
                key={t.id}
                className={`sidebar-item ${
                  this.props.selected && t.id === this.props.selected.id
                    ? "selected"
                    : ""
                }`}
                onClick={() => this.props.onSelectTask(t)}
              >
                {t.name}
              </li>
            ))}
        </ul>
        <a href="/flowable-modeler" className="modeler-link">
          modeler
        </a>
      </div>
    );
  }
}

export default Sidebar;
