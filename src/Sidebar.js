import React, { Component } from "react";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { user: this.props.user || "" };
    this.onUserChange = this.onUserChange.bind(this);
  }

  onUserChange(event) {
    this.setState({ user: event.target.value });
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-title">
          Filter by user
          <input
            type="search"
            value={this.state.user}
            placeholder="User..."
            onChange={this.onUserChange}
          />
          <button
            onClick={() => {
              this.props.onUserFilter(this.state.user);
            }}
          >
            Go
          </button>
        </div>
        <div className="sidebar-title">Taks</div>
        <ul>
          {this.props.taskList &&
            this.props.taskList.map(t => (
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
        <a href="/flowable-task" target="_blank" className="flowable-task-link">
          Flowable Tasks
        </a>
      </div>
    );
  }
}

export default Sidebar;
