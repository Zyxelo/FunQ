import React from 'react';
import {Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import axios from 'axios';

class Signup extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            errors: {},
            email: '',
            password: '',
            name: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    formSubmit(event) {
        event.preventDefault();

        axios.post('http://localhost:8080/auth/signup', {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
        })
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    alert("Welcome, you have succesfully created an account in!");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return(
            <div className="container wrapper">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <Form onSubmit={this.formSubmit}>
                            <FormGroup controlId="username">
                                <FormControl type="text" placeholder="Email" name="email" onChange={this.handleChange} value={this.state.email} />
                            </FormGroup>
                            <FormGroup controlId="password">
                                <FormControl type="password" placeholder="Password" name="password" onChange={this.handleChange}  value={this.state.password} />
                            </FormGroup>
                            <FormGroup controlId="name">
                                <FormControl type="text" placeholder="Name" name="name" onChange={this.handleChange} value={this.state.name} />
                            </FormGroup>
                            <Button type="submit">Signup</Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;