import React, { Component } from 'react'
// import '../Screens/SearchPage.css';
import S from '../Components/searchbar'
import F from '../Components/filterPanel'
import Results from '../Components/results'
import { Redirect } from 'react-router-dom'
import query from "query-string";
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
class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.SetFilters = this.SetFilters.bind(this)
    this.SetResults = this.SetResults.bind(this)
    this.renderRedirect = this.renderRedirect.bind(this)
  }
  state = {
    w:null,
    flip: true,
    results: Array(6).fill([]),
    newResults: Array(6).fill([]),
    tabs: [
      'Certificates',
      'Tasks',
      'Members',
      'Partners',
      'CoworkingSpace',
      'EducationalOrganisations'
    ],
    tags: [
      [
        'Certification Name:',
        'Educational Organization:',
        'Method_of_payment:',
        'Fees:',
        'others:',
        'skills:'
      ],
      [
        'OwnerName:',
        'effortLevel:',
        'experienceLevel:',
        'commitmentLevel:',
        'timeRequired:',
        'monetaryComp:',
        'skills:',
        'others:'
      ],
      ['place holder:'],
      ['place holder:'],
      ['place holder:'],
      ['place holder:']
    ],
    routes: [
      '/certificate',
      '/taskview',
      '/member',
      '/partner',
      '/coworking',
      '/eduorganization'
    ],
    redirect: false,
    goto: null
  }

  componentDidMount() {
    this.reset()
  }
  reset() {
    this.setState({ w: query.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).q});
    
    fetch(`/api/search?q=`+this.state.w)
      .then(res => res.json())
      .then(res => {
        this.setState({
          results: res.slice(),
          newResults: res.slice()
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  renderRedirect = (route, id, b) => {
    if (b) {
      this.setState({
        redirect: true,
        goto: route + '?id=' + id
      })
    }
  }
  call() {
    if (this.state.redirect) {
      return <Redirect to={this.state.goto} />
    }
  }
  SetResults(res) {
    this.setState({
      results: res.slice(),
      newResults: res.slice()
    })

    console.log(this.state.results)
  }
  SetFilters(i, res) {
    if (res === -1) {
      this.setState({
        newResults: this.state.results
      })
    } else {
      this.state.newResults[i] = res
      let t = this.state.newResults.slice()
      this.setState({
        newResults: t
      })
      // this.forceUpdate()
    }
    console.log(this.state.results)
  }
  render() {
    const tabs = this.state.tabs

    return (
      <div>
        {this.call()}
        <Jumbotron>
          <h1>ADVANCED SEARCH</h1>
          <p>here you can search for everything we have!</p>
          <p>
            <S change={this.SetResults} />
          </p>
        </Jumbotron>
        <div>
          <Container fluid={true}>
            <Row>
              <Tab.Container id="left-tabs-example" defaultActiveKey="Tasks">
                <Row>
                  <Col xs md lg="5">
                    <Nav variant="pills" fill={true} className="flex-column">
                      {tabs.slice(0, 2).map(p => {
                        return (
                          <Nav.Item>
                            <Nav.Link eventKey={p}>{p}</Nav.Link>
                          </Nav.Item>
                        )
                      })}
                    </Nav>
                  </Col>
                  <Col>
                    <Tab.Content>
                      {tabs.slice(0, 2).map(p => {
                        return (
                          <Tab.Pane eventKey={p}>
                            <F
                              id={tabs.indexOf(p)}
                              keywords={this.state.tags[tabs.indexOf(p)]}
                              change={this.SetFilters}
                              results={this.state.results[tabs.indexOf(p)]}
                              flip={this.state.flip}
                            />
                          </Tab.Pane>
                        )
                      })}
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
              <Col>
                <Tabs
                  id="controlled-tab-example"
                  activeKey={this.state.key}
                  onSelect={key => this.setState({ key })}
                >
                  {tabs.map(p => {
                    return (
                      <Tab eventKey={p} title={p}>
                        <Results
                          results={this.state.newResults[tabs.indexOf(p)]}
                          route={this.state.routes[tabs.indexOf(p)]}
                          renderRedirect={this.renderRedirect}
                          redirect={this.state.redirect}
                        />
                      </Tab>
                    )
                  })}
                </Tabs>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

export default SearchPage
