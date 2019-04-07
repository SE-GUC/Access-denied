import React from "react";
import s from "./searchbar";
class filterPanel extends React.Component {
  constructor(props) {
    super(props);
    //   this.handleChange = this.handleChange.bind(this);
    this.state = {
      keywords: Array(6).fill(null)
    };
  }

  handleChange(event) {
    // const data = new FormData(event.target);
    this.state.keywords[event.target.id] = event.target.value;
    console.log(this.state.keywords);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>{"effortLevel:"}</label>
          <input
            type="text"
            id={0}
            name={"effortLevel:"}
            onChange={(this.handleChange = this.handleChange.bind(this))}
            size="10"
          />
        </div>
        <div>
          <label>{"experienceLevel:"}</label>
          <input
            type="text"
            id={1}
            name={"experienceLevel:"}
            onChange={(this.handleChange = this.handleChange.bind(this))}
            size="10"
          />
        </div>{" "}
        <div>
          <label>{"commitmentLevel:"}</label>
          <input
            type="text"
            id={2}
            name={"commitmentLevel:"}
            onChange={(this.handleChange = this.handleChange.bind(this))}
            size="10"
          />
        </div>{" "}
        <div>
          <label>{"timeRequired:"}</label>
          <input
            type="text"
            id={3}
            name={"timeRequired:"}
            onChange={(this.handleChange = this.handleChange.bind(this))}
            size="10"
          />
        </div>{" "}
        <div>
          <label>{"monetaryComp:"}</label>
          <input
            type="text"
            id={4}
            name={"monetaryComp:"}
            onChange={(this.handleChange = this.handleChange.bind(this))}
            size="10"
          />
        </div>{" "}
        <div>
          <label>{"skills:"}</label>
          <input
            type="text"
            id={5}
            name={"skills:"}
            onChange={(this.handleChange = this.handleChange.bind(this))}
            size="10"
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default filterPanel;
