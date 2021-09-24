import * as React from "react";
import {Form} from "semantic-ui-react";

const Input = ({input, handleChange, inverted}) => {
    return (
        <div>
            <Form.Field>
                <label style={{color: inverted ? 'white': '#393B3B'}}>{input.label}</label>
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