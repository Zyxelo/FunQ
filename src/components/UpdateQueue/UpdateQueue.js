/**
 * Created by martin on 2017-05-23.
 */

import React from 'react';
import {Radio, Button, Col, FormGroup, FormControl, ControlLabel, Form} from 'react-bootstrap';
import callApi from '../../api';

class UpdateQueue extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      endDate: '',
      privacy: '',
      thumbnail:'',
      title: '',
      description: '',
      longDescription: '',
      eventDate: '',
      location: '',
      category: '',
      nrOfQueuers: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    callApi('queues/'+this.props.match.params.id,'get')
      .then( (response) => {

        let endD = response.data.queueEndDate;
        endD = endD.substr(0,endD.length-1);
        let eventD = response.data.queueEventDate;
        eventD = eventD.substr(0,eventD.length - 1);

        this.setState({
          endDate: endD,
          privacy: response.data.privacy,
          thumbnail: response.data.thumbnail,
          title: response.data.queueTitle,
          description: response.data.queueShortDescription,
          longDescription: response.data.queueLongDescription,
          eventDate: eventD,
          location: response.data.location,
          category: response.data.queueCategory,
          nrOfQueuers: response.data.numberOfQueuers
        });
      })
      .catch( (err) => {
        console.log(err);
      })

  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const submit = {
      thumbnail: this.state.thumbnail,
      queueTitle: this.state.title,
      queueEventDate: this.state.eventDate,
      queueEndDate: this.state.endDate,
      location: this.state.location,
      queueShortDescription: this.state.description,
      queueLongDescription: this.state.longDescription,
      queueCategory: this.state.category,
      numberOfQueuers: parseInt(this.state.nrOfQueuers,0),
      privacy: this.state.privacy,
    };

    const { history } = this.props;

    callApi('queues/'+this.props.match.params.id, 'put', submit, true)
      .then( (res) => {
        alert('You have updated the queue!');
        history.push('/mypage');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="container wrapper">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
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
                  Queue short description
                </Col>
                <Col sm={9}>
                  <FormControl name="description" value={this.state.description} onChange={this.handleChange} componentClass="textarea" />
                </Col>
              </FormGroup>

              <FormGroup controlId="createQueueLongDescription">
                <Col componentClass={ControlLabel} sm={3}>
                  Queue long description
                </Col>
                <Col sm={9}>
                  <FormControl name="longDescription" value={this.state.longDescription} onChange={this.handleChange} componentClass="textarea" rows="10" />
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
                    Update event
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateQueue