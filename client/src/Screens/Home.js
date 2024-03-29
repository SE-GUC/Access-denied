import React, { Component } from 'react'
import bg from '../Images/bg.jpg'
import { Link } from 'react-router-dom'
import { AppConsumer } from '../Containers/AppProvider'
import {
  Hero,
  CallToAction,
  ScrollDownIndicator,
  Checklist,
  Section
} from 'react-landing-page'

const featherCheckmark = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="green"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)
class Home extends Component {
  scroll() {
    setTimeout(() => window.scrollTo(0, 50), 200)
  }
  render() {
    this.scroll()
    return (
      <>
        <AppConsumer>
          {context => {
            if (context.token) this.props.history.push('/profile')
          }}
        </AppConsumer>
        <Hero color="white" bg="black" backgroundImage={bg}>
          <Section heading="Lirten Hub" subhead="Your way to Success" />
          <span>
            <CallToAction mt={3}>
              <Link to="/signup">Signup</Link>
            </CallToAction>
            <CallToAction href="/login" mt={3}>
              <Link to="/login">login</Link>
            </CallToAction>
            <CallToAction href="/About" mt={3}>
              <Link to="/About">About Us</Link>
            </CallToAction>
            <ScrollDownIndicator />
          </span>
        </Hero>
        <Section
          width={1}
          heading="Why pick LirtenHub"
          subhead="Here, you can:"
        >
          <Checklist
            children={[
              'Get Certified',
              'Do projects for multinational companies',
              'Get mentored by Senior Developers\n',
              'Find certified freelancers for your projects'
            ]}
            checkmark={featherCheckmark}
          />
        </Section>
      </>
    )
  }
}

export default Home
