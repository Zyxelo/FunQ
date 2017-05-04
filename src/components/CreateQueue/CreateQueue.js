import React from 'react';
import {Radio, Button, Col, FormGroup, FormControl, ControlLabel, Form} from 'react-bootstrap';

import './CreateQueue.css';

class CreateQueue extends React.Component {

    constructor(props) {
        super(props);

        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth()+1;
        if (month < 10) month = '0'+month;
        var day = today.getDate();
        var day2 = today.getDate()+2;
        if (day < 10) day = '0'+day;
        if (day2 < 10) day2 = '0'+day2;
        var startD = year+'-'+month+'-'+day;
        var endD = year+'-'+month+'-'+day2;

        this.state = {
            openDate: startD,
            openTime:"12:00",
            endDate: endD,
            endTime:"12:00",
            privacy: "public",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div className="container wrapper">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <Form horizontal onSubmit={this.handleSubmit}>

                            <FormGroup controlId="createQueueTitle">
                                <Col componentClass={ControlLabel} sm={3}>
                                    Queue title
                                </Col>
                                <Col sm={9}>
                                    <FormControl type="text" placeholder="Enter title" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="createQueueTitle">
                                <Col componentClass={ControlLabel} sm={3}>
                                    Queue description
                                </Col>
                                <Col sm={9}>
                                    <FormControl componentClass="textarea" placeholder="Enter title" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>Queue privacy</Col>
                                <Col sm={9}>
                                    <Radio name="privacy" value="private" onChange={this.handleChange} checked={this.state.privacy === 'private'} inline>
                                        Private queue
                                    </Radio>
                                    {' '}
                                    <Radio name="privacy" value="public" onChange={this.handleChange} checked={this.state.privacy === 'public'} inline>
                                        Public queue
                                    </Radio>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>Image link</Col>
                                <Col sm={9}>
                                    <FormControl type="url" placeholder="Enter image link" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>Open date</Col>
                                <Col sm={9}>
                                    <FormControl name="openDate" type="date" value={this.state.openDate} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>Open time</Col>
                                <Col sm={9}>
                                    <FormControl name="openTime" type="time" value={this.state.openTime} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>End date</Col>
                                <Col sm={9}>
                                    <FormControl name="endDate" type="date" value={this.state.endDate} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>End time</Col>
                                <Col sm={9}>
                                    <FormControl name="endTime" type="time" value={this.state.endTime} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={3} sm={9}>
                                    <Button type="submit">
                                        Create event
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        );
    }
}

export default CreateQueue