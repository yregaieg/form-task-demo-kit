import * as React from "react";
import { Model } from "@flowable/forms-react";


export default class StartProcessButton extends Model.FormComponent {

    constructor(props) {
        super(props);

        this.startProcessFromForm = this.startProcessFromForm.bind(this);
    }

    dictToVariables(dict) {
        return Object.keys(dict)
            .map(key => ({
                name: key,
                id: key,
                type: 'string',
                value: '' + dict[key]
            }));
    }

    startProcessFromForm () {
        const { payload } = this.props;
        const postData = {};
        postData.variables = this.dictToVariables(payload);
        postData.processDefinitionKey = "P000-Test-Process";
        const apiUrl = "http://localhost:3000/flowable-task/process-api/runtime/process-instances/";
        const requestParams = {
            method: 'POST',
            headers: {
                    'Content-Type':'application/json',
                    'Authorization': 'Basic '+btoa('admin:test')
                },
            body:   JSON.stringify(postData)
            }

        fetch(apiUrl, requestParams)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    render() {
        const { config } = this.props;
        return (
            <div id={config.id} className="flw__component">
                <div
                    onClick={this.startProcessFromForm}>
                    <button>Start Process</button>
                </div>
            </div>
        );
    }
}
