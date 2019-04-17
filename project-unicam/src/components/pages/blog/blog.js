import React, { Component } from 'react';

import { Form, Col, FormControl, Button, InputGroup,  } from 'react-bootstrap';

class Blog extends Component {

    leggiForm () {
        const segnLuogo = this.luogoInput.value
        const segnCitta = this.cittaInput.value
        const segnProv = this.provinciaInput.value
        /* const segnTesto; */
        console.log("DATI FORM: "+segnLuogo +" "+segnCitta+" "+segnProv)
    }

    render() {
        return (
            <div>
                <h1>Blog</h1>

                <Form onSubmit={() => { this.leggiForm() }} ref={(form) => { this.segnForm = form }}>
                    <Form.Row>
                        <Form.Group controlId="formLuogo">
                        <Form.Label>Luogo</Form.Label>
                        <Form.Control type="text" placeholder="Istituto, social network, etc." 
                         ref={(input) => {this.luogoInput = input}}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formCitta">
                        <Form.Label>Città</Form.Label>
                        <Form.Control placeholder="Roma"
                        ref={(input) => {this.cittaInput = input}}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formProvincia">
                        <Form.Label>Provincia</Form.Label>
                        <Form.Control placeholder="RM"
                        ref={(input) => {this.provinciaInput = input}}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formTesto">
                        <Form.Label>Testo</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                            </InputGroup.Prepend>
                            <FormControl as="textarea"/>
                        </InputGroup>
                        </Form.Group>
                    </Form.Row>                    

                    <Button onClick={this.leggiForm} variant="primary" type="button">
                        Submit
                    </Button>
                </Form>

            </div>
        );
    }
}
export default Blog;