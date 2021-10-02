import React from "react";
import {verification} from '../services/userService'
import {Form, Grid} from "semantic-ui-react";
import TheForm from "./common/theForm";
import {Link} from "react-router-dom";
import Joi from "joi-browser";

class SignupForm extends TheForm {

    state={
        inputs: [{
            name: "verificationCode",
            value: "",
            type: "text",
            placeholder: "Verification Code",
            label: "Verification Code"
        }],
        errors: {}
    }

    schema = {
        verificationCode: Joi.string().required().label('Verification Code'),
    };

    getData = () => {
        const {inputs} = this.state;
        return {
            verificationCode: inputs.filter(input=>input.name==='verificationCode')[0].value,
        }
    };

    doSubmit = async() => {
        try {
            const user = await verification(this.getData())
            localStorage.setItem('jwtToken', user.headers['x-auth-token']);
            window.location = '/';
        }catch (ex) {
            const errors = {...this.state.errors};
            errors.verificationCode = ex.response.data;
            this.setState({errors});
        }
    }

    render() {
        const toLogin = <Form.Field as={Link} to={'/'}>
            Already have an account ?.
        </Form.Field>

        return (
            <React.Fragment>
                <Grid container columns={3}>
                    <Grid.Column/>
                    <Grid.Column>
                        {this.renderForm('Email Verification', toLogin, 'Submit')}
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        );
    }
}

export default SignupForm;