import React from 'react';
import {Radio, Button, Form, Col, FormGroup, ControlLabel} from 'react-bootstrap';
import FormItem from './FormItem/FormItem';

function QueueForm(props) {
  return(
    <div className="container wrapper">
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <Form horizontal onSubmit={props.submit}>
            <FormItem label="Queue title" name="title" type="text" value={props.data.title} onChange={props.handleChange} />
            <FormItem label="Queue short description" name="description" type="text" value={props.data.description} onChange={props.handleChange} class="textarea"/>
            <FormItem label="Queue long description" name="longDescription" type="text" value={props.data.longDescription} onChange={props.handleChange} class="textarea"/>
            <FormItem label="Event location" name="location" type="text" value={props.data.location} onChange={props.handleChange} />
            <FormItem label="Event date" name="eventDate" type="datetime-local" value={props.data.eventDate} onChange={props.handleChange} />

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Queue privacy</Col>
              <Col sm={9}>
                <Radio name="privacy" value="private" onChange={props.handleChange} checked={props.data.privacy === 'private'} inline>
                  Private queue
                </Radio>
                {' '}
                <Radio name="privacy" value="public" onChange={props.handleChange} checked={props.data.privacy === 'public'} inline>
                  Public queue
                </Radio>
              </Col>
            </FormGroup>

            <FormItem label="Image link" name="thumbnail" type="url" value={props.data.thumbnail} onChange={props.handleChange} />
            <FormItem label="End date" name="endDate" type="datetime-local" value={props.data.endDate} onChange={props.handleChange} />
            <FormItem label="Queue Category" name="category" type="text" value={props.data.category} onChange={props.handleChange} />
            <FormItem label="Max queuers" name="nrOfQueuers" type="number" value={props.data.nrOfQueuers} onChange={props.handleChange} />
            <FormItem label="YouTube Link" name="youTube" type="string" value={props.data.youTube} onChange={props.handleChange} />
            <FormItem label="Spotify playlist Link" name="spotifyUrl" type="string" value={props.data.spotifyUrl} onChange={props.handleChange} />
            <FormItem label="Additional image" name="imageUrl" type="string" value={props.data.imageUrl} onChange={props.handleChange} />

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
  )
}

export default QueueForm;