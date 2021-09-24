import {Component} from "react";
import {Button, Form} from "semantic-ui-react";
import Input from "./input";


class TheForm extends Component {

    state={
        inputs: [],
        error: {}
    }

    handleChange = (input) => {
        const inputs = [...this.state.inputs];
        const newInput = inputs.find(i=>i.name===input.target.name);
        newInput.value = input.target.value;
        const index = inputs.indexOf(newInput);
        inputs[index] = newInput;

        this.setState(inputs);
    }


    renderForm(heading, extra, btn){
        const {inputs} = this.state;
        const {handleChange, handleSubmit} = this;
        const {inverted} = this.props;
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
                                inverted={inverted}
                            />
                        );
                    })}
                    {extra}
                    <br/>
                    <Button primary floated={'right'} type='submit'>{btn}</Button>
                </Form>
            </div>
        );
    }

}

export default TheForm
