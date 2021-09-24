import React from "react";
import {Button, Form} from "semantic-ui-react";
import Input from "./input";

function TheForm({heading, inputs, handleChange, handleSubmit, extra}) {
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
                        />
                    );
                })}
                {extra}
                <br/>
                <Button primary floated={'right'} type='submit'>{heading}</Button>
            </Form>
        </div>
    );
}

export default TheForm;