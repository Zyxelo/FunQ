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
    var day = pad(today.getDate()+2);
    var endD = year+'-'+month+'-'+day+'T12:00';

    this.state = {
      endDate: endD,
      privacy: "public",
      thumbnail:'',
      title: '',
      description: '',
      longDescription:'',
      eventDate: endD,
      location: '',
      category: '',
      nrOfQueuers: 50,
      youTube: '',
      spotifyUrl: '',
      imageUrl: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let carousel = [];
    if (this.state.youTube !== '') carousel[0] = {type: 'video', src: this.state.youTube};
    carousel[carousel.length] = {type: 'img', src: this.state.thumbnail};
    if (this.state.imageUrl !== '') carousel[carousel.length] = {type: 'img', src: this.state.imageUrl};

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
      carousel: carousel,
      spotifyUrl: this.state.spotifyUrl
    };

    const { history } = this.props;

    callApi('queues/', 'post', submit, true)
      .then( (res) => {
        alert('You have created a new queue!');
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
                  <FormControl name="longDescription" value={this.state.longDescription} onChange={this.handleChange} componentClass="textarea" />
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
                <Col componentClass={ControlLabel} sm={3}>
                  YouTube Link
                </Col>
                <Col sm={9}>
                  <FormControl name="youTube" type="string" value={this.state.youTube} onChange={this.handleChange} />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Spotify playlist Link
                </Col>
                <Col sm={9}>
                  <FormControl name="spotifyUrl" type="string" value={this.state.spotifyUrl} onChange={this.handleChange} />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Additional image
                </Col>
                <Col sm={9}>
                  <FormControl name="additionalImage" type="string" value={this.state.imageUrl} onChange={this.handleChange} />
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
        </div>
      </div>
    );
  }
}

export default CreateQueue