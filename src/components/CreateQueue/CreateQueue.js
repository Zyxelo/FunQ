import React from 'react';
import {Radio, Button, Col, FormGroup, FormControl, ControlLabel, Form} from 'react-bootstrap';
import callApi from '../../api';

import './CreateQueue.css';

class CreateQueue extends React.Component {

    constructor(props) {
        super(props);

        function pad(number) {
            if (number < 10) number = '0'+number;
            return number;
        }

        var today = new Date();
        var year = today.getFullYear();
        var month = pad(today.getMonth()+1);
        var day = pad(today.getDate());
        var day2 = pad(today.getDate()+2);
        var startD = year+'-'+month+'-'+day+'T12:00';
        var endD = year+'-'+month+'-'+day2+'T12:00';

        this.state = {
            openDate: startD,
            endDate: endD,
            privacy: "public",
            thumbnail:'',
            title: '',
            description: '',
            eventDate: endD,
            location: '',
            category: '',
            nrOfQueuers: 0,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const submit = {
            thumbnail: this.state.thumbnail,
            queueTitle: this.state.title,
            queueCompany: localStorage.getItem('userID'),
            queueEventDate: this.state.eventDate,
            queEndDate: this.state.endDate,
            location: this.state.location,
            queueShortDescription: this.state.description,
            queueCategory: this.state.category,
            numberOfQueuers: parseInt(this.state.nrOfQueuers),
        };

        const { history } = this.props;

        callApi('queues/', 'post', submit, true)
          .then( (res) => {
              alert('You have created a new queue!');
              history.push('/mypage')+submit.queueID
          })
          .catch((err) => {
            console.log(err);
          })
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
                                    <FormControl name="title" type="text" value={this.state.title} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="createQueueDescription">
                                <Col componentClass={ControlLabel} sm={3}>
                                    Queue description
                                </Col>
                                <Col sm={9}>
                                    <FormControl name="description" value={this.state.description} onChange={this.handleChange} componentClass="textarea" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Event location
                                </Col>
                                <Col sm={9}>
                                    <FormControl name="location" type="text" value={this.state.location} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Event date
                                </Col>
                                <Col sm={9}>
                                    <FormControl name="eventDate" type="datetime-local" value={this.state.eventDate} onChange={this.handleChange} />
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
                                    <FormControl name="thumbnail" type="url" value={this.state.thumbnail} onChange={this.handleChange}/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>Open date</Col>
                                <Col sm={9}>
                                    <FormControl name="openDate" type="datetime-local" value={this.state.openDate} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>End date</Col>
                                <Col sm={9}>
                                    <FormControl name="endDate" type="datetime-local" value={this.state.endDate} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Queue Category
                                </Col>
                                <Col sm={9}>
                                    <FormControl name="category" type="text" value={this.state.category} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Max queuers
                                </Col>
                                <Col sm={9}>
                                    <FormControl name="nrOfQueuers" type="number" value={this.state.nrOfQueuers} onChange={this.handleChange} />
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