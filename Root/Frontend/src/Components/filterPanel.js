import React from "react";
import S from "./searchbar";
class Key extends React.Component{
  render() {
    this.setState=  this.props.state

    return (
      <div>
      <label>{this.props.title}</label>
      <input
        type="text"
        id={this.props.id}
        name={this.props.title}
        size="10"
        onChange={this.props.fu}
      />
    </div>
    )
}}

class filterPanel extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

state = {
      keywordsResults: Array(6).fill(null),
      keywords:["effortLevel:","experienceLevel:","commitmentLevel:","timeRequired:","monetaryComp:","skills:"]
    }

  handleChange(event) {
    this.state.keywordsResults[event.target.id] = event.target.value;
    console.log(this.state.keywordsResults)
  }

  render() {
    const Tags=this.state.keywords
    return (
      <form >
        {Tags.map(p=>{
            return(  <Key id={Tags.indexOf(p)} title={p}  fu={this.handleChange}  />
            )

        })}
        <div>        <S Tags={this.state.keywordsResults}  fu={this.props.change}/>
 </div>
    </form>)}}

export default filterPanel;