import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "LOADING"
    };
    this.onload = this.onload.bind(this);
  }
  onload() {
    const doc = this.iframe.contentWindow.document;
    if (doc.getElementById("login-form")) {
      this.setState({ status: "NO_LOGGED" });
      setTimeout(this.onload, 100);
    } else {
      this.setState({ status: "LOGGED" });
      this.props.onLogin();
    }
  }
  render() {
    if (this.state.status === "LOGGED") return null;
    return (
      <React.Fragment>
        {this.state.status !== "NO_LOGGED" && <div className="spinner" />}
        <iframe
          src="flowable-task/#/login"
          title="Login Frame"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ opacity: this.state.status === "NO_LOGGED" ? 1 : 0 }}
          onLoad={this.onload}
          ref={ref => (this.iframe = ref)}
        />
      </React.Fragment>
    );
  }
}

export default Login;
