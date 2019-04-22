import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Card,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap'

import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

const listStyle = {
  height: 'auto',
  maxHeight: '200px',
  overflowX: 'hidden'
}

class ProjectLanding extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Jumbotron
          style={{
            padding: '50px',
            backgroundImage: `url("https://www.illinoistech.org/resource/resmgr/images/ita_graphics/general_event_slide.jpg")`,
            backgroundSize: 'cover',
            color: 'white',
            width: '100%'
          }}
        >
          <h1 style={{ fontWeight: 'bold' }}>Explore Lirten Hub's Project</h1>
          <small style={{ fontStyle: 'italic' }}>
            Lirten Hub hosts a multitude of projects on all scales for our
            partners, explore the variety of projects and discover the
            opportunities within.
          </small>
        </Jumbotron>

        <Container>
          <Row className="justify-content-center">
            <Card style={{ padding: '50px', width: '60%' }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '50px' }}>Projects</Card.Title>

                <Card.Subtitle className="mb-2 text-muted">
                  A world of choices
                </Card.Subtitle>

                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>

                <hr
                  style={{
                    height: '10px',
                    border: '0',
                    boxShadow: '0 10px 10px -10px #7ec0ee inset'
                  }}
                />
              </Card.Body>

              <ListGroup className="list-group-flush" style={listStyle}>
                <ListGroupItem>
                  Eu Lorem velit laborum proident culpa aliqua non. Est commodo
                  non eu cillum occaecat. Consequat ad elit exercitation cillum
                  amet ex aliqua magna enim cupidatat ut magna in. Anim veniam
                  do pariatur amet ex. Lorem fugiat in ut eiusmod. Irure
                  adipisicing irure amet velit est in duis. Cupidatat dolor
                  exercitation consequat eu ut qui sunt est fugiat magna veniam
                  officia sint.
                </ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
              </ListGroup>
            </Card>
          </Row>
        </Container>
      </div>
    )
  }
}

export default ProjectLanding
