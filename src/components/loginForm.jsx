import React from "react";
import {Form, Grid} from "semantic-ui-react";
import TheForm from "./common/theForm";
import {Link} from "react-router-dom";
import Joi from "joi-browser";
import {login} from "../services/authService";
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
        errors: {}
    }

    schema = {
        email: Joi.string().required().email().label('Email'),
        password: Joi.string().required().min(6).max(50).label('Password')
    };

    getData = () => {
        const {inputs} = this.state;
        return {
            email: inputs.filter(input=>input.name==='email')[0].value,
            password: inputs.filter(input=>input.name==='password')[0].value
        }
    };

    doSubmit = async() => {
        try{
            const user = await login(this.getData());
            localStorage.setItem('jwtToken', user.headers['x-auth-token']);
            window.location = '/';
        }catch (ex) {
            if(ex.response && ex.response.status === 400){
                const errors = this.state.errors;
                errors.email = ex.response.data;
                this.setState({errors});
            }
        }
    }

    render() {
        const forgetPassword = <div>
            <Grid>
                <Grid.Column>
                    <Grid.Row>
                        <Form.Field as={Link} to={'/forgetpassword'}>
                            Forget Password ?
                        </Form.Field>
                    </Grid.Row>
                    <Grid.Row>
                        <Form.Field as={Link} to={'/signup'}>
                            Signup for new account.
                        </Form.Field>
                    </Grid.Row>
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
                </Grid>
            </React.Fragment>
        );
    }
}

export default LoginForm;