import {Component} from "react";
import {Button, Form, Grid} from "semantic-ui-react";
import Input from "./input";
import Joi from "joi-browser";

class TheForm extends Component {

    state={
        inputs: [],
        errors: {}
    };

    handleChange = (input) => {
        const inputs = [...this.state.inputs];
        const errors = {...this.state.errors};
        const newInput = inputs.find(i=>i.name===input.target.name);
        newInput.value = input.target.value;
        const index = inputs.indexOf(newInput);
        inputs[index] = newInput;
        delete errors[newInput.name];
        this.setState({inputs, errors});
    }

    validate = () => {
        const {error} = Joi.validate(this.getData(), this.schema, {abortEarly: false});
        if(!error) return null;

        const errors = {};
        for(let item of error.details) {
            errors[item.path[0]] = item.message;
        }

        return errors;
    }

    handleSubmit = () => {
        const errors = this.validate();
        this.setState({errors: errors || {}})
        if(errors) return;
        this.doSubmit()
    }

    renderForm(heading, extra, btn){
        const {inputs} = this.state;
        const {handleChange, handleSubmit} = this;
        const {inverted} = this.props;
        return (
            <div>
                <h1>{heading}</h1>
                <Form onSubmit={handleSubmit}>
                    {inputs.map(input=>{
                        return (
                            <Input
                                key={input.name}
                                input={input}
                                handleChange={handleChange}
                                inverted={inverted}
                                error={this.state.errors[input.name]}
                            />
                        );
                    })}

                    <Grid columns={2}>
                        <Grid.Column>
                            {extra}
                        </Grid.Column>
                        <Grid.Column>
                            <Button primary floated={'right'} type='submit'>{btn}</Button>
                        </Grid.Column>
                    </Grid>
                </Form>
            </div>
        );
    }

}

export default TheForm
