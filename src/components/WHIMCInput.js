import React, { Component } from 'react';

import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

class WHIMCInput extends React.Component {
    render() {
        return (
            <InputGroup className={this.props.className}>
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">{this.props.symbol}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    placeholder={this.props.text}
                    aria-label={this.props.text}
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
        )
    }
}

export default WHIMCInput;