import * as React from "react";
import {Form, Input as inp} from "semantic-ui-react";

const Input = ({input, handleChange, inverted, error}) => {
    return (
        <div style={{marginBottom: '15px', color: 'red'}}>
            <label style={{color: inverted ? 'white': '#393B3B', fontWeight: '1000'}}>{input.label}</label>
            <Form.Field
                control={inp}
                placeholder={input.placeholder}
                name={input.name}
                value={input.value}
                type={input.type}
                onChange={handleChange}
                error={error && {
                    content: error,
                    pointing: 'below',
                }}
            />
        </div>
    );
};

export default Input;