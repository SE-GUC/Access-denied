import React, { Component } from 'react'

import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Jumbotron
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

const listStyle = {
  height: 'auto',
  maxHeight: '350px',
  overflowX: 'hidden',
  width: '100%'
}

class Project extends Component {
  constructor(props) {
    super(props)

    this.state = {
      projectDetails: {},
      ownerDetails: {},
      projectTasks: []
    }
  }

  componentDidMount() {
    fetch(`/api/project/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          projectDetails: data,
          ownerDetails: data.owner,
          projectTasks: data.tasks
        })
      })
  }

  render() {
    let renderTasks

    if (this.state.projectTasks.length === 0) {
      renderTasks = (
        <Card>
          <Card.Body>
            <Card.Title>
              <strong>No tasks available yet for this project</strong>
            </Card.Title>
          </Card.Body>
        </Card>
      )
    } else {
      renderTasks = (
        <ListGroup className="list-group-flush" style={listStyle}>
          {this.state.projectTasks.map(value => {
            return (
              <ListGroup.Item>
                <Link to={`/taskview?id=${value._id}`}>
                  <h3>
                    <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                      {value.name}
                    </span>
                  </h3>
                </Link>
                <h5 style={{ marginBottom: '20px' }}>
                  Owner: {this.state.ownerDetails.name}
                </h5>
                <br />
                <p>About The Project: {value.description}</p>
                <br />
                <br />
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      )
    }

    return (
      <Container>
        <Row>
          <Jumbotron
            style={{
              width: '100%',
              marginTop: '30px',
              padding: '30px',
              backgroundColor: '#0069c7',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            <h1>{this.state.projectDetails.title}</h1>
          </Jumbotron>
        </Row>

        <Row>
          <Col xs={7}>
            <Card style={{ height: '100%' }}>
              <Card.Body>
                <Card.Text>
                  <strong>Description: </strong>
                  {this.state.projectDetails.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Row>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <strong>{this.state.ownerDetails.name}</strong>
                  </Card.Title>
                  <Card.Text>
                    About the partner: Lorem ad aliqua eiusmod deserunt
                    excepteur adipisicing et incididunt et sit qui occaecat.
                    Veniam labore Lorem velit cupidatat Lorem sit pariatur et
                    laboris. Incididunt eu sit magna ex nulla in Lorem laborum
                    ullamco consequat elit magna aliqua. Excepteur cupidatat
                    exercitation enim dolor cillum magna deserunt enim minim
                    nisi laborum. Ullamco deserunt eiusmod aute velit qui ad
                    aliqua dolore eiusmod mollit minim.
                  </Card.Text>

                  <Link to={`/partner?id=${this.state.ownerDetails._id}`}>
                    Profile
                  </Link>
                </Card.Body>
              </Card>
            </Row>

            <br />

            <Row style={{ width: '100%' }}>{renderTasks}</Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Project
