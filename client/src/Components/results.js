import React, { Component } from 'react'
import C from './Card'
import {
  Jumbotron,
  ListGroup,
  Tab,
  Row,
  Col,
  Container,
  CardColumns,
  Tabs,
  Nav
} from 'react-bootstrap'
class results extends Component {
  constructor(props) {
    super(props)
    this.state = {
      route: this.props.route,
      redirect: this.props.redirect
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      route: nextProps.route
    })
    console.log('route')
  }

  render() {
    const cards = this.props.results
    return (
      <CardColumns>
        {cards.map(p => {
          return (
            <C
              content={p.description}
              title={p.name}
              date={p.date}
              id={p._id}
              redirect={this.state.redirect}
              route={this.props.route}
              redirect={this.props.renderRedirect}
            />
          )
        })}{' '}
      </CardColumns>
    )
  }
}

export default results
