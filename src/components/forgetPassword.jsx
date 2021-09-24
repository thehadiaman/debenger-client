import React from "react";
import TheForm from "./common/theForm";
import {Form, Grid} from "semantic-ui-react";
import {Link} from "react-router-dom";

class ForgetPassword extends TheForm {

    state={
        inputs: [{
            name: "email",
            value: "",
            type: "email",
            placeholder: "Email",
            label: "Email"
        }],
        error: {}
    }

    render() {
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