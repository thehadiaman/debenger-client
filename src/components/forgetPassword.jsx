import React from "react";
import TheForm from "./common/theForm";
import {Form, Grid} from "semantic-ui-react";
import {Link, Redirect} from "react-router-dom";
import Joi from "joi-browser";

class ForgetPassword extends TheForm {

    state={
        inputs: [{
            name: "email",
            value: "",
            type: "email",
            placeholder: "Email",
            label: "Email"
        }],
        errors: {}
    }

    schema = {
        email: Joi.string().required().email().label('Email')
    };

    getData = () => {
        return {
            email: this.state.inputs.filter(input=>input.name==='email')[0].value
        }
    };

    doSubmit = () => {
        console.log('Submitting forget password');
    }

    render() {

        const {user} = this.props;
        console.log(this.props);
        if(user && !user.verified) return <Redirect to={"/verification"}/>
        else if(user && user.verified) return <Redirect to={"/"}/>

        const forgetPassword = <Form.Field as={Link} to={'/signup'}>
            Signup for account.
        </Form.Field>

        return (
            <React.Fragment>
                <Grid container columns={3}>
                    <Grid.Column/>
                    <Grid.Column>
                        {this.renderForm('Forget Password', forgetPassword, 'Submit')}
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        );
    }
}

export default ForgetPassword;