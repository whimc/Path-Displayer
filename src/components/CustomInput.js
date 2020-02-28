import React from 'react';

import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

class CustomInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            symbol: '',
            text: '',
        }
    }

    render() {

        var prepend = (null)
        if (this.props.symbol) {
            prepend = (
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">{this.props.symbol}</InputGroup.Text>
                </InputGroup.Prepend>
            )
        }

        return (
            <InputGroup className={this.props.className}>
                {prepend}
                <FormControl
                    onChange={this.props.onChange}
                    placeholder={this.props.text}
                    aria-label={this.props.text}
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
        )
    }
}

export default CustomInput;