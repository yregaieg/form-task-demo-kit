import * as React from "react"
import ReactToggle from "react-toggle";
import { _, Model } from "@flowable/forms-react";

export default class Toggle extends Model.FormComponent {

    render() {
      const { config, onChange } = this.props;
      const label = _.get(config, "label");
      const disabled = config.enabled === false;
      return (
      <div id={config.id} className="flw__component">
          <div className="flw__toggle">
              <ReactToggle
               checked={config.value || false}
               onChange={() => onChange(!config.value)}
               disabled = {disabled}
              />
              <span>{label}</span>
          </div>
      </div>
    );
  }
}
