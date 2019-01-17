import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
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
        <a href="/flowable-modeler" className="modeler-link">
          modeler
        </a>
      </div>
    );
  }
}

export default Sidebar;
