import React from 'react';
import {Col, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

function FormItem(props) {
  return(
    <FormGroup>
      <Col componentClass={ControlLabel} sm={3}>{props.label}</Col>
      <Col sm={9}>
        <FormControl name={props.name} type={props.type} value={props.value} onChange={props.onChange} componentClass={props.class} />
      </Col>
    </FormGroup>
  )
}

export default FormItem;