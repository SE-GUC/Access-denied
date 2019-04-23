import React, { Component } from 'react'
import {Container, Row, Col, Card, ListGroup, Jumbotron} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

const listStyle = {
  height: 'auto',
  maxHeight: '350px',
  overflowX: 'hidden'
}

class TaskLanding extends Component{

    constructor(props){

        super(props)

        this.state = {
            availableTasks: []
        }
    }

    componentDidMount() {
        fetch('/api/task/all')
        .then(response => response.json())
        .then(data => {
            this.setState({
                availableTasks: data
            })
        })
    }

    render() {
        return(
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
                    <h1 style={{ fontWeight: 'bold' }}>Explore Lirten Hub's Tasks</h1>
                    <small style={{ fontStyle: 'italic' }}>
                        Lirten Hub offers a variety of tasks that fit every individual's skill, experience and dedication.
                    </small>
                </Jumbotron>

                <Container>
                    <Row className="justify-content-center">
                        <Card style={{ padding: '50px', width: '60%' }}>
                        <Card.Body>
                            <Card.Title style={{ fontSize: '50px' }}>Tasks</Card.Title>

                            <Card.Subtitle className="mb-2 text-muted">
                            A world of choices
                            </Card.Subtitle>

                            <Card.Text>
                            Explore Lirten Hub's tasks that are sure to fit anyone and everyone !
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
                            {this.state.availableTasks.map(value => {
                            return (
                                <ListGroup.Item>
                                <Link to={`/taskview/?id=${value._id}`}>
                                    <h3>
                                    <span
                                        style={{ fontWeight: 'bold', fontStyle: 'italic' }}
                                    >
                                        {value.name}
                                    </span>
                                    </h3>
                                </Link>
                                <br />
                                <p>About The Project: {value.description}</p>
                                <br />
                                <strong>Job Price: <span style={{fontStyle: 'italic', color: 'grey'}}>{value.monetaryComp}$</span></strong>
                                <br />
                                <br />
                                <p><span className={!value.isComplete ? "w3-tag w3-red" : "w3-tag w3-green"}>{!value.isComplete ? "Not Finished" : "Finshed"}</span></p>
                                <p><span class="w3-tag w3-blue">Phase: {value.phase}</span></p>
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

export default TaskLanding