import React from "react";
import {Grid} from "semantic-ui-react";
import TheForm from "./common/theForm";
import Joi from "joi-browser";
import {getDebate, saveDebate, updateDebate} from "../services/debateService";

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


    async componentDidMount() {
        if(this.props.match.params.id !== 'new'){
            try{
                const inputs = [...this.state.inputs];
                const debate = await getDebate(this.props.match.params.id);

                inputs.filter(input=>input.name==='title')[0].value = debate.title;
                inputs.filter(input=>input.name==='description')[0].value = debate.description;
                inputs.filter(input=>input.name==='tags')[0].value = debate.tags.toString();

                this.setState({inputs, id: this.props.match.params.id})

            }catch (ex) {
                console.log(ex);
            }
        }else{
            this.setState({newDebate: true})
        }
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
            tags: inputs.filter(input=>input.name==='tags')[0].value.split(',')
        }
    };

    doSubmit = async () => {
        if(!this.state.newDebate){
            const {id} = this.state;
            try {
                await updateDebate(id, this.getData());
                this.props.history.replace('/');
            }catch (ex){
                console.log(ex);
            }
        }else{
            try {
                await saveDebate(this.getData());
                this.props.history.replace('/');
            }catch (ex){
                console.log(ex);
            }
        }
    }

    render() {

        const {inputs} = this.state;

        document.title = inputs.filter(input=>input.name==='title')[0].value || "New Debate";

        const extra = <div/>;

        return (
            <React.Fragment>
                <Grid container columns={3}>
                    <Grid.Column/>
                    <Grid.Column>
                        {this.renderForm(document.title, extra, 'Save')}
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        );
    }
}

export default DebateForm;