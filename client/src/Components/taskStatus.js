import React from 'react'

class taskStatus extends React.Component {
  state = {
    tasks: [],
    text: ''
  }

  componentDidMount() {
    fetch(`/api/task?id=5ca5f83962230b49f4ba162f`)
      .then(res => res.json())
      .then(res => {
        const task = res.data
        console.log(task.isComplete)
        this.setState({ tasks: task })
      })
  }
  setStateHandler = () => {
    this.setState({
      text: this.state.tasks.isComplete.toString()
    })
  }
  render() {
    return (
      <div>
        <button onClick={this.setStateHandler}>GET STATE</button>
        <h4>{this.state.text}</h4>
      </div>
    )
  }
}

export default taskStatus
