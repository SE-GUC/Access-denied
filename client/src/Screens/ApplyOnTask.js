import React, { Component } from 'react'
import ApplyConsultancyTask from '../Components/ApplyConsultancyTask'
import ApplyMemberTask from '../Components/ApplyMemberTask'
import query from 'query-string'
import { AppConsumer } from '../Containers/AppProvider'
import PropTypes from 'prop-types'

class ApplyOnTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: null,
      id: null,
      type: null,
      changed: 0
    }
  }

  gettaskID() {
    let taskid = query.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).id
    console.log(taskid)
    return taskid
  }

  render() {
    let taskid = this.gettaskID()
    return (
      <div>
        <AppConsumer>
          {context => {
            if (this.state.changed === 2) return
            console.log(context)
            this.setState({
              token: context.token,
              id: context.id,
              type: context.type,
              changed: this.state.changed + 1
            })
          }}
        </AppConsumer>
        {this.state.changed ? (
          this.state.type === 'Members' ? (
            <ApplyMemberTask
              className="ApplicationForm"
              taskID={taskid}
              tokenchild={this.state.token}
            />
          ) : (
            <ApplyConsultancyTask
              className="ApplicationForm"
              taskID={taskid}
              tokenchild={this.state.token}
            />
          )
        ) : null}
      </div>
    )
  }
}
export default ApplyOnTask
