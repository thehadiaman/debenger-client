import * as React from "react";
import {Form} from "semantic-ui-react";

const Input = ({input, handleChange}) => {
    return (
        <div>
            <Form.Field>
                <label>{input.label}</label>
                <input
                    placeholder={input.placeholder}
                    name={input.name}
                    value={input.value}
                    type={input.type}
                    onChange={handleChange}
                />
                <br/>
                <br/>
            </Form.Field>
        </div>
    );
};

export default Input;