import React from "react";
import {Card,Button } from 'react-bootstrap'


function MediaCard(props) {
  return (
 
    <Card border="primary">
    <Card.Body>
      <Card.Title>{props.title}</Card.Title>
      <Card.Text>
      {props.content}
      </Card.Text>
      <Button variant="outline-info" size="sm" onClick={()=>props.redirect(props.route,props.id,true)}>Go to page</Button>
      <Card.Footer>
      <small className="text-muted">      {props.date}
</small>
    </Card.Footer>
    </Card.Body>
  </Card>
  );
}


export default (MediaCard);
