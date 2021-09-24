import React, {Component} from "react";
import {Form, Grid} from "semantic-ui-react";
import TheForm from "./common/theForm";
import {Link} from "react-router-dom";

class LoginForm extends Component {

    state={
        inputs: [{
            name: "email",
            value: "",
            type: "email",
            placeholder: "Email",
            label: "Email"
        }, {
            name: "password",
            value: "",
            type: "password",
            placeholder: "Password",
            label: "Password"
        }],
        error: {
            email: "",
            password: ""
        }
    }

    handleChange = (input) => {
        const inputs = [...this.state.inputs];

        const newInput = inputs.find(i=>i.name===input.target.name);
        newInput.value = input.target.value;
        const index = inputs.indexOf(newInput);
        inputs[index] = newInput;

        this.setState(inputs);
    }

    handleSubmit = () => {
        console.log('Submitting');
    }

    render() {
        const {inputs} = this.state;
        const {handleChange, handleSubmit} = this;

        const forgetPassword = <Form.Field as={Link} to={'/'}>
            Forget Password ?
        </Form.Field>

        return (
            <React.Fragment>
                <Grid container columns={3}>
                    <Grid.Column/>
                    <Grid.Column>
                        <TheForm
                            heading={'Login'}
                            inputs={inputs}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            extra={forgetPassword}
                        />
                    </Grid.Column>
                    <Grid.Column/>
                </Grid>
            </React.Fragment>
        );
    }
}

export default LoginForm;