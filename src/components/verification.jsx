import React from "react";
import {verification} from '../services/userService'
import {Form, Grid} from "semantic-ui-react";
import TheForm from "./common/theForm";
import {Link, Redirect} from "react-router-dom";
import Joi from "joi-browser";
import jwtDecode from "jwt-decode";

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
            const user = await verification(this.getData());
            console.log(user);
            console.log(jwtDecode(user.headers['x-auth-token']));
            localStorage.setItem('jwtToken', user.headers['x-auth-token']);
            window.location = '/';
        }catch (ex) {
            const errors = {...this.state.errors};
            console.log(ex);
            errors.verificationCode = ex.response ? ex.response.data : ex.message;
            this.setState({errors});
        }
    }

    render() {
        const {user} = this.props;
        if(!user) return <Redirect to={"/login"} />
        else if(user && user.verified) return <Redirect to={"/"} />
        document.title = "Verification";

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