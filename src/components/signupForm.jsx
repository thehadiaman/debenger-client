import React from "react";
import {Form, Grid} from "semantic-ui-react";
import TheForm from "./common/theForm";
import {Link} from "react-router-dom";

class SignupForm extends TheForm {

    state={
        inputs: [{
            name: "Name",
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
        error: {}
    }

    handleSubmit = () => {
        console.log('Submitting');
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
                        {this.renderForm('Signup', toLogin)}
                    </Grid.Column>
                    <Grid.Column/>
                </Grid>
            </React.Fragment>
        );
    }
}

export default SignupForm;