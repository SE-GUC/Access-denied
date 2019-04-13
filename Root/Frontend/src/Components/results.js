import React, { Component } from "react";
import C from "./Card";
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
} from "react-bootstrap";

class results extends Component {
  render() {
    return (
      <CardColumns>
        {this.props.results.map(p => {
          return <C content={p.description} title={p.name} date={p.date} />;
        })}{" "}
      </CardColumns>
    );
  }
}

export default results;
