import React, { Component } from "react";
import axios from "axios";
// import '../Screens/SearchPage.css';
import S from "../Components/searchbar";
import F from "../Components/filterPanel";
import Results from "../Components/results";
import {Jumbotron,ListGroup,Tab,Row,Col,Container,CardColumns,Tabs,Nav} from 'react-bootstrap'
class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.SetResults = this.SetResults.bind(this);
  }
  state = {
    results: [[],[],[],[],[],[]],
    tabs:["Certificates" ,"Tasks","Members","Partners","CoworkingSpace","EducationalOrganisations"],
    tags: [[
      'Certification Name:',
      'Educational Organization:',
      'Method_of_payment:',
      'Fees:',
      'others:',
      "skills:"
    ],[
      'OwnerName:',
      "effortLevel:",
      "experienceLevel:",
      "commitmentLevel:",
      "timeRequired:",
      "monetaryComp:",
      "skills:",
      'others:'
    ],['place holder:'
  ],['place holder:'
],['place holder:'
],['place holder:'

    ]]
  };

  componentDidMount() {
   this.reset()
  }
reset(){
  fetch(`api/task/all`)
  .then(res => res.json())
  .then(res => {
    this.state.results[1]=res
    
  })
  .catch(err => {
    console.log(err);
  });
}
  SetResults(res) {
    if(res===-1){
     this.reset()
    }else{
      this.setState({
        results: res
      })
    }
    
    console.log(this.state.results);
  }

  render() {
    const tabs = this.state.tabs;

    return (
      <div>
        <Jumbotron>
      <h1>ADVANCED SEARCH</h1>
      <p>
        here you can search for everything we have!
      </p>
      <p>
        <S change={this.SetResults}/>
      </p>
    </Jumbotron>
        <div>
        <Container fluid= {true}>
  <Row> 
    <Tab.Container id="left-tabs-example" defaultActiveKey="Tasks">
  <Row>
    <Col xs md lg="5">
      <Nav variant="pills" fill={true} className="flex-column">
      {tabs.map(p => {
          return <Nav.Item>
          <Nav.Link eventKey={p}>{p}</Nav.Link>
        </Nav.Item>})}
        
      </Nav>
    </Col>
    <Col >
      <Tab.Content>
      {tabs.map(p => {
          return <Tab.Pane eventKey={p}>
          <F keywords={this.state.tags[tabs.indexOf(p)]} change={this.SetResults} />
          </Tab.Pane>})}

      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
    <Col><Tabs
        id="controlled-tab-example"
        activeKey={this.state.key}
        onSelect={key => this.setState({ key })}
      >
       {tabs.map(p => {
          return <Tab eventKey={p} title={p}>
          <Results results={this.state.results[tabs.indexOf(p)]} />
          </Tab> 
        })}
      </Tabs></Col>
  </Row></Container>
       
          
        </div>
        
       </div>
    );
  }
}

export default SearchPage;
