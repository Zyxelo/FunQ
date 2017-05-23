import React from 'react';
import { withRouter } from 'react-router';
import {Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import callApi from '../../api';

class Signup extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            errors: {},
            email: '',
            password: '',
            name: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    formSubmit(event) {
        event.preventDefault();

        const { history } = this.props;

        let config = {
          email: this.state.email,
          password: this.state.password,
          name: this.state.name
        };

        callApi('auth/signup','post', config)
            .then((response) => {
                if (response.status == 200) {
                    history.push('/home');
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

const signupWithRouter = withRouter(Signup);

export default signupWithRouter;