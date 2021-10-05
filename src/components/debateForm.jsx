import React from "react";
import {Grid} from "semantic-ui-react";
import TheForm from "./common/theForm";
import Joi from "joi-browser";

class DebateForm extends TheForm {

    state={
        inputs: [{
            name: "title",
            value: "",
            type: "text",
            placeholder: "Title",
            label: "Title"
        },{
            name: "description",
            value: "",
            type: "textarea",
            placeholder: "Description",
            label: "Description"
        },{
            name: "tags",
            value: "",
            type: "text",
            placeholder: "Tags",
            label: "Tags"
        }],
        errors: {}
    }

    schema = {
        title: Joi.string().min(5).max(100).required().label('Email'),
        description: Joi.string().min(10).max(225).label('Description'),
        tags: Joi.array().min(1).required()
    };

    getData = () => {
        const {inputs} = this.state;
        return {
            title: inputs.filter(input=>input.name==='title')[0].value,
            description: inputs.filter(input=>input.name==='description')[0].value,
            tags: inputs.filter(input=>input.name==='tags')[0].value.split(' ')
        }
    };

    doSubmit = () => {
        console.log(this.getData());
    }

    render() {

        document.title = "Debate";

        const extra = <div/>;

        return (
            <React.Fragment>
                <Grid container columns={3}>
                    <Grid.Column/>
                    <Grid.Column>
                        {this.renderForm('Debate', extra, 'Save')}
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        );
    }
}

export default DebateForm;