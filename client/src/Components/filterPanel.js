import React from 'react'
import S from './searchbar'
import { InputGroup, Form, Button } from 'react-bootstrap'

class Key extends React.Component {
  render() {
    this.setState = this.props.state

    return (
      <div>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default">
              {this.props.title}
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            id={this.props.id}
            name={this.props.title}
            onChange={this.props.fu}
          />
        </InputGroup>
      </div>
    )
  }
}

class filterPanel extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  state = {
    results: this.props.results,
    keywordsResults: Array(6).fill(null),
    keywords: this.props.keywords,
    flip: false
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      results: nextProps.results
    })
    console.log('wth')

    // let k=this.searcht(this.state.keywordsResults,this.state.results)
  }

  searcht(tags, alltasks) {
    let tasks = []
    tags.forEach(function(tag) {
      alltasks.forEach(function(task) {
        task.Tags.forEach(function(key) {
          let j = tasks.find(function(ele) {
            return task == ele
          })
          if (tag == key && j == null) {
            tasks.push(task)
          }
        })
      })
    })

    this.props.change(this.props.id, tasks)
    return tasks
  }
  handleChange(event) {
    console.log('hamhere')
    console.log(this.state.keywordsResults)
    if (event.target.value) {
      this.state.keywordsResults[event.target.id] =
        this.state.keywords[event.target.id] + event.target.value
      let tags = this.state.keywordsResults
      let res = this.searcht(tags, this.state.results)
      // this.props.change(this.props.id, res)
      console.log('new')
      console.log(res)
    } else {
      this.props.change(-1)
      this.state.keywordsResults[event.target.id] = null
      // this.props.change(this.props.id, this.state.results)
      console.log('new')
      console.log(this.state.results)
    }
  }

  render() {
    const Tags = this.props.keywords
    return (
      <Form>
        {Tags.map(p => {
          return <Key id={Tags.indexOf(p)} title={p} fu={this.handleChange} />
        })}
        <div>
          {' '}
          {/* <S Tags={this.state.keywordsResults} fu={this.props.change} /> */}
        </div>
        <Button
          variant="primary"
          type="button"
          onClick={() =>
            this.searcht(this.state.keywordsResults, this.state.results)
          }
        >
          APPLY Filters
        </Button>
      </Form>
    )
  }
}

export default filterPanel
