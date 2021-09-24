import React from "react";
import {Form, Grid} from "semantic-ui-react";
import TheForm from "./common/theForm";
import {Link} from "react-router-dom";

class LoginForm extends TheForm {

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
        error: {}
    }

    handleSubmit = () => {
        console.log('Submitting');
    }

    render() {
        const forgetPassword = <div>
            <Grid columns={2}>
                <Grid.Column>
                    <Form.Field as={Link} to={'/forgetpassword'}>
                        Forget Password ?
                    </Form.Field>
                </Grid.Column>
                <Grid.Column>
                    <Form.Field as={Link} to={'/signup'}>
                        Signup for new account.
                    </Form.Field>
                </Grid.Column>
            </Grid>
        </div>

        return (
            <React.Fragment>
                <Grid container columns={3}>
                    <Grid.Column/>
                    <Grid.Column>
                        {this.renderForm('Login', forgetPassword, 'Login')}
                    </Grid.Column>
                    <Grid.Column/>
                </Grid>
            </React.Fragment>
        );
    }
}

export default LoginForm;