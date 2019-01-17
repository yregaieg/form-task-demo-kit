import React from "react";
import { FormControlled, _ } from "@flowable/forms-react";
import { JsonTree } from "react-editable-json-tree";
import customComponents from "./custom-components";

export class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      definition: props.formDefinition || getFormDefinition(props.definitions),
      payload: props.payload || {},
      forceVal: false,
      defCollapsed: true,
      stateCollapsed: true,
      defKey: _.uid(),
      stateKey: _.uid()
    };
    this.onChange = this.onChange.bind(this);
    this.refreshDefinition = this.refreshDefinition.bind(this);
    this.refreshPayload = this.refreshPayload.bind(this);
    this.showStoryBookPanels = this.showStoryBookPanels.bind(this);
    this.renderCompleteButton = this.renderCompleteButton.bind(this);
  }

  onChange(value) {
    this.setState({
      forceVal: value.$isOutcome,
      payload: _.lazyCloneEdit(this.state.payload, value.$path, value.$value)
    });
  }

  refreshDefinition(definition) {
    this.setState({
      definition
    });
  }

  refreshPayload(payload) {
    this.setState({
      payload
    });
  }

  render() {
    return (
      <div className="form-container">
        <FormControlled
          {...this.props}
          config={this.state.definition}
          onChange={this.onChange}
          payload={this.state.payload}
          fetch={_.futch}
          Components={customComponents}
          additionalData={Object.assign({}, this.props.additionalData, {
            currentUser: {
              name: "Peppa Pig",
              id: "P16"
            },
            Math: window.Math,
            knowsLanguage: (user, languange) => {
              if (!user || !user.languages) return "NO";
              return user.languages.indexOf(languange) >= 0 ? "YES" : "NO";
            },
            skins: toneName => {
              switch (toneName) {
                case "fair":
                  return "#ddb9aa";
                case "light":
                  return "#f2d2ba";
                case "pale":
                  return "#f2d2ba";
                case "dark":
                  return "#9d7d5f";
                case "brown":
                  return "#73553e";
                default:
                  return toneName;
              }
            },
            number: n => {
              n = n.replace(",", ".");
              if (!isNaN(parseFloat(n)) && isFinite(n)) {
                return "<div style='text-align:right'>" + n + "</div>";
              }
              return (
                "<div style='text-align:right;color: lightgray; font-size: 11px;'>" +
                n +
                "</div>"
              );
            },
            matchOptions: (a, b, c) => {
              return c[b.indexOf(a)];
            },
            icon: {
              birreta:
                "<img width='24' height='24' src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNzZweCIgaWQ9IkNhcGFfMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDc2OyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTAwIDc2IiB3aWR0aD0iMTAwcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0xNi41MSw0OS4xOTdjMi4zMTksOS4zOTYsNS4yNjcsMTMuNTAxLDE1LjExLDE3LjgwNVM0Ni4xMzksNzYsNTAsNzZzOC4yMzktNC4xMTIsMTguMDgzLTguNDE2czcuMjE4LTUuNjEzLDkuNTM3LTE1LjAwOSAgTDUwLDY2TDE2LjUxLDQ5LjE5N3ogTTk3LjU1NSwyNC42OEw1NS45MywxLjM3Yy0zLjI2Mi0xLjgyNi04LjU5OC0xLjgyNi0xMS44NTksMEwyLjQ0NSwyNC42OGMtMy4yNjEsMS44MjYtMy4yNjEsNC44MTQsMCw2LjY0MSAgTDQ0LjA3LDU0LjYyOWMzLjI2MiwxLjgyNyw4LjU5OCwxLjgyNywxMS44NTksMGwyNi45MDgtMTUuMDY3bC0yOS4xNzktNi44MzVjLTEuMTI2LDAuMjc5LTIuMzYyLDAuNDM1LTMuNjU5LDAuNDM1ICBjLTUuMjU2LDAtOS41MTgtMi41MzUtOS41MTgtNS42NjJjMC0zLjEyNyw0LjI2Mi01LjY2Myw5LjUxOC01LjY2M2M0LjA4MSwwLDcuNTUyLDEuNTMyLDguOTA0LDMuNjc4bDMwLjkwNiwxMC4xNDNsNy43NDQtNC4zMzcgIEMxMDAuODE1LDI5LjQ5NSwxMDAuODE1LDI2LjUwNiw5Ny41NTUsMjQuNjh6IE04NC44MzMsNjguODU2Yy0wLjMxOCwxLjkyMyw2LjQxNyw1LjA4Myw3LjA1OS0wLjU0MiAgYzIuODkzLTI1LjM1Ny0yLjA4MS0zMi42NTYtMi4wODEtMzIuNjU2bC02Ljk3MywzLjkwNEM4Mi44MzgsMzkuNTYyLDg4Ljc1LDQ1LjE4OSw4NC44MzMsNjguODU2eiIvPjxnLz48Zy8+PGcvPjxnLz48Zy8+PGcvPjxnLz48Zy8+PGcvPjxnLz48Zy8+PGcvPjxnLz48Zy8+PGcvPjwvc3ZnPg=='>",
              rocket:
                "<img width='24' height='24' src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDgwMCA4MDAiIGhlaWdodD0iODAwcHgiIGlkPSJHVUlERSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgODAwIDgwMCIgd2lkdGg9IjgwMHB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggZD0iTTU4MC41NjIsMjE5LjQzOWMtMTIuNzIxLTEyLjcyMy0yOS42MzctMTkuNzI4LTQ3LjYyMy0xOS43MjhjLTE3Ljk4NywwLTM0LjkwMyw3LjAwNS00Ny42MjUsMTkuNzI4ICBjLTEyLjcyLDEyLjcyLTE5LjcyNSwyOS42MzQtMTkuNzI1LDQ3LjYyMWMwLDE3Ljk5LDcuMDA1LDM0LjkwNCwxOS43MjUsNDcuNjI1YzEyLjcyMiwxMi43MjEsMjkuNjMzLDE5LjcyMyw0Ny42MTgsMTkuNzI2ICBjMC4wMDcsMCwwLjAwNywwLDAuMDA3LDBjMTcuOTg2LDAsMzQuOTAyLTcuMDA1LDQ3LjYyMy0xOS43MjZjMTIuNzIxLTEyLjcyMywxOS43MjYtMjkuNjM2LDE5LjcyNi00Ny42MjUgIEM2MDAuMjg2LDI0OS4wNzMsNTkzLjI4MSwyMzIuMTYsNTgwLjU2MiwyMTkuNDM5eiBNNTUzLjc3MSwyODcuODk1Yy01LjU2Niw1LjU2OC0xMi45Niw4LjYzNi0yMC44MzQsOC42MzZsMCwwICBjLTcuODcyLTAuMDAyLTE1LjI3MS0zLjA2OC0yMC44MzQtOC42MzZjLTUuNTY2LTUuNTYyLTguNjMzLTEyLjk2LTguNjMzLTIwLjgzNGMwLTcuODY4LDMuMDY1LTE1LjI2OSw4LjYzMy0yMC44MzQgIGM1LjU2My01LjU2NSwxMi45NjctOC42MywyMC44MzQtOC42M2M3Ljg2OCwwLDE1LjI2OCwzLjA2MywyMC44MzQsOC42M0M1NjUuMjYzLDI1Ny43MTUsNTY1LjI2MywyNzYuNDA3LDU1My43NzEsMjg3Ljg5NXoiIGZpbGw9IiMwNDFDM0YiLz48Zz48cGF0aCBkPSJNNjIuMjgyLDYyNy4yMThjLTQuODQ3LDAtOS42OTMtMS44NDctMTMuMzkyLTUuNTQ2Yy03LjM5OC03LjM5Ny03LjM5OC0xOS4zOTUsMC0yNi43OUwxNTguNDIsNDg1LjM1ICAgYzcuMzk4LTcuMzk3LDE5LjM5Mi03LjM5NywyNi43OSwwczcuMzk4LDE5LjM5NSwwLDI2Ljc5Mkw3NS42NzYsNjIxLjY3MkM3MS45NzgsNjI1LjM3MSw2Ny4xMzEsNjI3LjIxOCw2Mi4yODIsNjI3LjIxOHoiIGZpbGw9IiMwNDFDM0YiLz48L2c+PGc+PHBhdGggZD0iTTg2Ljc3NCw3MzIuMTcyYy00Ljg1LDAtOS42OTYtMS44NS0xMy4zOTUtNS41NDljLTcuMzk4LTcuMzk3LTcuMzk4LTE5LjM4OSwwLTI2Ljc4NkwxODcuNTQ1LDU4NS42NyAgIGM3LjM5OC03LjM5OCwxOS4zOTItNy4zOTgsMjYuNzg3LDBjNy4zOTgsNy4zOTgsNy4zOTgsMTkuMzkzLDAsMjYuNzlMMTAwLjE2OCw3MjYuNjIzQzk2LjQ3LDczMC4zMjIsOTEuNjIsNzMyLjE3Miw4Ni43NzQsNzMyLjE3MiAgIHoiIGZpbGw9IiMwNDFDM0YiLz48L2c+PGc+PHBhdGggZD0iTTE5MS43MjUsNzU2LjY2MWMtNC44NDksMC05LjY5Ni0xLjg0Ny0xMy4zOTUtNS41NDZjLTcuMzk4LTcuMzk3LTcuMzk4LTE5LjM5MywwLTI2Ljc4OUwyODcuODYzLDYxNC43OSAgIGM3LjM5Ni03LjM5NCwxOS4zOTItNy4zOTYsMjYuNzg3LDBjNy4zOTgsNy4zOTcsNy4zOTgsMTkuMzk1LDAsMjYuNzkzTDIwNS4xMiw3NTEuMTE1ICAgQzIwMS40MjEsNzU0LjgxMywxOTYuNTc0LDc1Ni42NjEsMTkxLjcyNSw3NTYuNjYxeiIgZmlsbD0iIzA0MUMzRiIvPjwvZz48cGF0aCBkPSJNNzUxLjExMyw0OC44OTFjLTQuMzAyLTQuMy0xMC40MDktNi4yNzgtMTYuNDAzLTUuMzExYy0yLjIwMiwwLjM1Ny01NC43MDUsOC45OC0xMjYuMjUsMzYuMzE2ICBjLTQxLjk3NCwxNi4wMzQtODEuODUsMzUuMjM3LTExOC41MjksNTcuMDc2Yy00NS4wMzksMjYuODE0LTg1LjM1Niw1Ny43MjEtMTE5Ljg5OSw5MS44NzFsLTE0My4wNTUsMjcuODUgIGMtMy42OTMsMC43MTgtNy4wODYsMi41MjQtOS43NTMsNS4xNzdMODcuNjE4LDM5MS4wNmMtNS45MDcsNS44ODYtNy4yNjcsMTQuOTM4LTMuMzYsMjIuMzAxYzMuMzMsNi4yNyw5LjgxOCwxMC4wNTksMTYuNzI1LDEwLjA1OSAgYzEuMjAyLDAsMi40MTUtMC4xMTQsMy42MjgtMC4zNDdsMTQ2LjE4NS0yOC40NjNjLTkuNTE2LDE4LjY3Mi0xOC40MTksMzguMDU1LTI2LjY4Myw1OC4xNDQgIGMtMi45MDQsNy4wNzItMS4yNzksMTUuMTk0LDQuMTI1LDIwLjYwM2wzNS44MTEsMzUuODExbC0zMy4yNywzMy4yN2MtNy4zOTgsNy4zOTgtNy4zOTgsMTkuMzksMCwyNi43ODcgIGMzLjY5OSwzLjY5OSw4LjU0NSw1LjU0OSwxMy4zOTcsNS41NDljNC44NDcsMCw5LjY5My0xLjg1LDEzLjM5Mi01LjU0NmwzMy4yNy0zMy4yNzFsMzUuODExLDM1LjgxMyAgYzMuNjI1LDMuNjE5LDguNDY5LDUuNTQ4LDEzLjQsNS41NDhjMi40MjMsMCw0Ljg3MS0wLjQ2Nyw3LjE5OS0xLjQyNmMyMC4wOTEtOC4yNjIsMzkuNDc1LTE3LjE2NSw1OC4xNDEtMjYuNjc4bC0yOC40NTUsMTQ2LjE4NiAgYy0xLjU5Myw4LjE4MywyLjM1LDE2LjQ0Myw5LjcwOSwyMC4zNTJjMi44MDYsMS40ODgsNS44NTIsMi4yMTMsOC44NzksMi4yMTNjNC45MTcsMCw5Ljc3OC0xLjkxOCwxMy40MTctNS41NzNsMTI5LjE4OC0xMjkuNjA0ICBjMi42NTYtMi42NjMsNC40NTktNi4wNjEsNS4xODEtOS43NTNsMjcuODQ1LTE0My4wNTVjMzQuMTQ4LTM0LjU0Nyw2NS4wNi03NC44NTksOTEuODc2LTExOS45MDEgIGMyMS44MzQtMzYuNjgzLDQxLjA0LTc2LjU1OCw1Ny4wNzctMTE4LjUyOWMyNy4zMy03MS41NTEsMzUuOTU4LTEyNC4wNDgsMzYuMzEzLTEyNi4yNSAgQzc1Ny4zODYsNTkuMjkyLDc1NS40MDcsNTMuMTg4LDc1MS4xMTMsNDguODkxeiBNMTU4LjM5MywzNzQuMDAxbDgxLjQ4OS04MS4yMjRsODcuNjc0LTE3LjA2OSAgYy0xOS4wMTUsMjMuMzkxLTM2LjY1NSw0OC42MzQtNTIuODQ3LDc1LjY0OEwxNTguMzkzLDM3NC4wMDF6IE01MDcuMjE5LDU2MC4xMjFsLTgxLjIyMiw4MS40ODlsMjIuNjQzLTExNi4zMTYgIGMyNy4wMjEtMTYuMTkyLDUyLjI1OS0zMy44Myw3NS42NDgtNTIuODQ4TDUwNy4yMTksNTYwLjEyMXogTTY4NC4zNTksMTc4LjkzNmMtMjMuOTE1LDYyLjM3MS02OC4wMSwxNTIuMzAyLTE0Mi4yMzcsMjI2LjUzMSAgYy0zNC4xNzEsMzQuMTY4LTczLjk2LDY0LjU0LTExOC44OSw5MC44MzhjLTAuODA0LDAuNDAxLTEuNTg1LDAuODU0LTIuMzIyLDEuMzY2Yy0yNC4wNDksMTMuOTQzLTQ5LjU2NiwyNi43MjgtNzYuNDc2LDM4LjMwMiAgbC0yNi44MDYtMjYuODA5bDU0LjExLTU0LjEwNmM3LjM5NS03LjM5Nyw3LjM5NS0xOS4zOTIsMC0yNi43OWMtNy4zOTgtNy4zOTctMTkuMzkyLTcuMzk2LTI2Ljc5LDBsLTU0LjEwOSw1NC4xMDZsLTI2LjgwNi0yNi44MDkgIGMxMS41NzgtMjYuOTEzLDI0LjM2MS01Mi40MzMsMzguMzA4LTc2LjQ4OGMwLjUwOC0wLjczMiwwLjk1MS0xLjUsMS4zNS0yLjI5NWMyNi4yOTgtNDQuOTM4LDU2LjY3Mi04NC43MzIsOTAuODQ5LTExOC45MDkgIGM3NC4yMjUtNzQuMjI1LDE2NC4xNTYtMTE4LjMxOSwyMjYuNTI3LTE0Mi4yMzVjMzcuODk3LTE0LjUzNyw3MC41MjItMjMuNjAxLDkyLjA5LTI4Ljc5NyAgQzcwNy45NTksMTA4LjQxMiw2OTguODk0LDE0MS4wMzgsNjg0LjM1OSwxNzguOTM2eiIgZmlsbD0iIzA0MUMzRiIvPjwvc3ZnPg=='>",
              user:
                "<img width='24' height='24' src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTAwIDUwMCIgaWQ9IkxheWVyXzEiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDUwMCA1MDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxnPjxwYXRoIGQ9Ik00MDAuNiw0MDIuOGgtMjcuNGMwLTY3LjktNTUuMy0xMjMuMi0xMjMuMi0xMjMuMmMtNjcuOSwwLTEyMy4yLDU1LjMtMTIzLjIsMTIzLjJIOTkuNGMwLTgzLDY3LjUtMTUwLjYsMTUwLjYtMTUwLjYgICAgUzQwMC42LDMxOS44LDQwMC42LDQwMi44eiIvPjwvZz48Zz48cGF0aCBkPSJNMjUwLDI3OS43Yy01Mi44LDAtOTUuOC00My05NS44LTk1LjhTMTk3LjIsODgsMjUwLDg4YzUyLjgsMCw5NS44LDQzLDk1LjgsOTUuOFMzMDIuOCwyNzkuNywyNTAsMjc5Ljd6IE0yNTAsMTE1LjQgICAgYy0zNy43LDAtNjguNCwzMC43LTY4LjQsNjguNHMzMC43LDY4LjQsNjguNCw2OC40czY4LjQtMzAuNyw2OC40LTY4LjRTMjg3LjcsMTE1LjQsMjUwLDExNS40eiIvPjwvZz48Zz48cG9seWdvbiBwb2ludHM9IjI3Ny40LDI2NiAyMjIuNiwyNjYgMjM2LjMsMzA3IDI2My43LDMwNyAgICIvPjwvZz48Zz48cG9seWdvbiBwb2ludHM9IjIyMi42LDQwMi44IDI3Ny40LDQwMi44IDI2My43LDMyMC43IDIzNi4zLDMyMC43ICAgIi8+PC9nPjwvZz48L3N2Zz4='>"
            }
          })}
          forceValidations={this.state.forceVal}
        />
        {!this.props.formDefinition.outcomes && this.renderCompleteButton()}
        {this.props.showStoryBookPanels && this.showStoryBookPanels()}
      </div>
    );
  }

  renderCompleteButton() {
    return (
      <div class="flw__panel__row flw__flw-form__row form__row">
        <div class="flw__panel__col--12 flw__flw-form__col--12 form__col--12">
          <div
            data-flw-id="flw-default-outcome-group"
            class="flw__buttongroup flw__container flw__buttongroup__left flw__container__left"
          >
            <div class="flw__buttongroup__buttongroup-item flw__container__buttongroup-item">
              <div class="flw__outcome-button flw__component">
                <button
                  class="flw__outcome-button__button flw__component__button"
                  onClick={() => {
                    this.props.onOutcomePressed(this.state.payload, "complete");
                  }}
                >
                  Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  showStoryBookPanels() {
    const definition2 = JSON.parse(JSON.stringify(this.state.definition));
    const payload2 = JSON.parse(JSON.stringify(this.state.payload));

    return (
      <div className="flw__panel flw__flw-form flw__storybook__panel">
        <div className="flw__panel__row flw__flw-form__row">
          <div className="flw__panel__col--6 flw__flw-form__col--6">
            <div className="flw__textarea flw__component">
              <label className="flw__label flw__textarea__label flw__component__label storybook__heading">
                <div
                  className={
                    this.state.defCollapsed ? "uncollapse" : "collapse"
                  }
                  onClick={() =>
                    this.setState(st => ({
                      defCollapsed: !st.defCollapsed,
                      defKey: _.uid()
                    }))
                  }
                />
                FORM DEFINITION
              </label>
              <JsonTree
                key={this.state.defKey}
                data={definition2}
                isCollapsed={() =>
                  console.log(this.state.defCollapsed) ||
                  this.state.defCollapsed
                }
                onFullyUpdate={this.refreshDefinition}
              />
            </div>
          </div>
          <div className="flw__panel__col--6 flw__flw-form__col--6">
            <div className="flw__textarea flw__component">
              <label className="flw__label flw__textarea__label flw__component__label storybook__heading">
                <div
                  className={
                    this.state.stateCollapsed ? "uncollapse" : "collapse"
                  }
                  onClick={() =>
                    this.setState(st => ({
                      stateCollapsed: !st.stateCollapsed,
                      stateKey: _.uid()
                    }))
                  }
                />
                FORM STATE
              </label>
              <JsonTree
                key={this.state.stateKey}
                data={payload2}
                isCollapsed={() => this.state.stateCollapsed}
                onFullyUpdate={this.refreshPayload}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const getPredefinedLayout = () =>
  getFormDefinition([
    {
      label: "Full name",
      value: "{{fullName}}",
      defaultValue: "{{currentUser.name}}"
    },
    {
      label: "Full name (repeat)",
      value: "{{fullName}}",
      enabled: "{{!$payload.dis}}"
    },
    {
      label: "Age",
      value: "{{age}}"
    }
  ]);

export const getFormDefinition = definitions =>
  Object.assign(
    {},
    {
      rows: [
        {
          cols: getColumns(definitions)
        }
      ]
    }
  );

const getColumns = definitions => {
  const size = Math.floor(12 / definitions.length);
  return definitions.map(definition =>
    getDefaultControl(Object.assign({}, { size }, definition))
  );
};

export const getDefaultControl = definition =>
  Object.assign(
    {
      id: "default-id-" + Math.floor(Math.random() * 1000),
      type: "text",
      size: 12,
      label: "Default label",
      isRequired: false,
      enabled: true,
      description: "Default description",
      extraSettings: {}
    },
    definition
  );
