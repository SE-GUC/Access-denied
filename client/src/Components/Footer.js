import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

class Footer extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <Row style={{ marginTop: '60px' }}>
        <footer className="container-fluid bg-grey py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6 align-self-center">
                    <div className="logo-part">
                      <h1 style={{ fontFamily: 'Audiowide', cursive: 'true' }}>
                        Lirten Hub
                      </h1>
                    </div>
                  </div>
                  <div className="col-md-6 px-4">
                    <h6> About Company</h6>
                    <p>We strive towards innovating the freelancing field!</p>
                    <Link to="/About/" className="btn-footer">
                      {' '}
                      More Info{' '}
                    </Link>
                    <br />
                    <Link to="/" className="btn-footer">
                      {' '}
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6 px-4">
                    <h6>Links</h6>
                    <div className="row ">
                      <div className="col-md-6">
                        <ul>
                          <li>
                            {' '}
                            <Link to="/"> Home</Link>{' '}
                          </li>
                          <li>
                            {' '}
                            <Link to="/About"> About</Link>{' '}
                          </li>
                          <li>
                            {' '}
                            <Link to="/Search/"> Search</Link>{' '}
                          </li>
                          <li>
                            {' '}
                            <Link to="/Project/"> Projects</Link>{' '}
                          </li>
                          <li>
                            {' '}
                            <Link to="/Task/"> Tasks</Link>{' '}
                          </li>
                          <li>
                            {' '}
                            <Link to="/allcertificates/">
                              {' '}
                              Certificates
                            </Link>{' '}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <h6> Newsletter</h6>
                    <div className="social">
                      <Link to="/">
                        <i className="fa fa-facebook" aria-hidden="true" />
                      </Link>
                      <Link to="/">
                        <i className="fa fa-instagram" aria-hidden="true" />
                      </Link>
                    </div>
                    <form className="form-footer my-3">
                      <input
                        type="text"
                        placeholder="Enter Your Email"
                        name="search"
                        disabled
                      />
                      <input type="button" value="Go" />
                    </form>
                    <p>Subscribe to our Newsletter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </Row>
    )
  }
}

export default Footer
