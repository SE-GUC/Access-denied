import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Card,
  ListGroup
} from 'react-bootstrap'

import { Link } from 'react-router-dom'

import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

const listStyle = {
  height: 'auto',
  maxHeight: '350px',
  overflowX: 'hidden'
}

class ProjectLanding extends Component {
  constructor(props) {
    super(props)

    this.state = {
      projectList: []
    }
  }

  componentDidMount() {
    fetch('/api/project/')
      .then(response => response.json())
      .then(data => {
        this.setState({
          projectList: data
        })
      })
  }

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
                  Discover Infinite Potential within the projects that are hosted
                  on Lirten Hub
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
                {this.state.projectList.map(value => {
                  return (
                    <ListGroup.Item>
                      <Link to={`/project/${value._id}`}>
                        <h3>
                          <span
                            style={{ fontWeight: 'bold', fontStyle: 'italic' }}
                          >
                            {value.title}
                          </span>
                        </h3>
                      </Link>
                      <h5 style={{ marginBottom: '20px' }}>
                        Owner: {value.owner.name}
                      </h5>
                      <br />
                      <p>About The Project: {value.description}</p>
                      <br />
                      <br />
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            </Card>
          </Row>
        </Container>
      </div>
    )
  }
}

export default ProjectLanding
