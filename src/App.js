import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Login from "./Login";
import { FormContainer } from "./FormContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      config: { rows: [] },
      selected: null,
      initialPayload: null
    };
    this.renderForm = this.renderForm.bind(this);
    this.getTaskForm = this.getTaskForm.bind(this);
    this.getTaskVariables = this.getTaskVariables.bind(this);
    this.onOutcomePressed = this.onOutcomePressed.bind(this);
    this.saveFormData = this.saveFormData.bind(this);
    this.completeSelectedTask = this.completeSelectedTask.bind(this);
  }

  onOutcomePressed(payload, outComeValue) {
    switch (outComeValue) {
      case "save":
        this.saveFormData(payload);
        break;
      case "complete":
        this.completeSelectedTask();
        break;
      default:
    }
  }

  completeSelectedTask() {
    fetch(`flowable-task/process-api/runtime/tasks/${this.state.selected.id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ action: "complete" })
    }).then(this.setState({ selected: null }));
  }

  saveFormData(payload) {
    fetch(
      `flowable-task/app/rest/task-forms/${this.state.selected.id}/save-form`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          formId: this.state.config.id,
          values: payload
        })
      }
    );
  }

  getTaskForm(t) {
    return fetch(`flowable-task/app/rest/task-forms/${t.id}`).then(r =>
      r.json()
    );
  }

  getTaskVariables(t) {
    return fetch(`flowable-task/app/rest/task-forms/${t.id}/variables`).then(
      r => r.json()
    );
  }

  renderForm(t) {
    this.getTaskForm(t).then(d => {
      if (d.id) {
        this.getTaskVariables(t).then(d2 => {
          this.setState({ config: d, selected: t, initialPayload: d2 });
        });
      } else {
        this.setState({ selected: null });
      }
    });
  }

  initialPayload = {};
  render() {
    return (
      <div className={`app ${this.state.login ? "logged" : "no-logged"}`}>
        {!this.state.login && (
          <Login onLogin={x => this.setState({ login: true })} />
        )}
        {this.state.login && (
          <Sidebar
            onSelectTask={this.renderForm}
            selected={this.state.selected}
          />
        )}
        {this.state.login && this.state.selected && (
          <FormContainer
            key={(this.state.selected && this.state.selected.id) || "blank"}
            className="form"
            formDefinition={this.state.config}
            payload={this.state.initialPayload}
            onChange={console.log}
            onOutcomePressed={this.onOutcomePressed}
          />
        )}
        {this.state.login && !this.state.selected && (
          <div className="form-container">Please pick a task</div>
        )}
      </div>
    );
  }
}

export default App;
