import React from "react";
import {signup} from '../services/userService'
import {Form, Grid} from "semantic-ui-react";
import TheForm from "./common/theForm";
import {Link, Redirect} from "react-router-dom";
import Joi from "joi-browser";

class SignupForm extends TheForm {

    state={
        inputs: [{
            name: "name",
            value: "",
            type: "text",
            placeholder: "Name",
            label: "Name"
        },{
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
        name: Joi.string().required().label('Name').min(3).max(50),
        email: Joi.string().required().email().label('Email'),
        password: Joi.string().required().min(6).max(50).label('Password')
    };

    getData = () => {
        const {inputs} = this.state;
        return {
            name: inputs.filter(input=>input.name==='name')[0].value,
            email: inputs.filter(input=>input.name==='email')[0].value,
            password: inputs.filter(input=>input.name==='password')[0].value
        }
    };

    doSubmit = async() => {
        try {
            const user = await signup(this.getData());
            localStorage.setItem('jwtToken', user.headers['x-auth-token']);
            window.location = '/verification';
        }catch (ex) {
            const errors = {...this.state.errors};
            errors.email = ex.response.data;
            this.setState({errors});
        }
    }

    render() {
        const {user} = this.props;
        if(user && !user.verified) return <Redirect to={"/verification"}/>
        else if(user && user.verified) return <Redirect to={"/"}/>
        document.title = "Signup";

        const toLogin = <Form.Field as={Link} to={'/'}>
            Already have an account ?.
        </Form.Field>

        return (
            <React.Fragment>
                <Grid container columns={3}>
                    <Grid.Column/>
                    <Grid.Column>
                        {this.renderForm('Signup', toLogin, 'Signup')}
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        );
    }
}

export default SignupForm;