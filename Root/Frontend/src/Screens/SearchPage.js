import React, { Component } from "react";
import axios from "axios";
// import '../Screens/SearchPage.css';
import S from "../Components/searchbar";
import F from "../Components/filterPanel";
import C from "../Components/results";

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.SetResults = this.SetResults.bind(this);
  }
  state = {
    results: []
  };

  componentDidMount() {
    axios.get(`http://localhost:3001/api/task/all`).then(res => {
      this.state = {
        results: res.data
      };
    });
  }

  SetResults(res) {
    this.state = {
      results: res
    };
    console.log(this.state.results);
  }

  render() {
    //  await this.GetTasks();

    return (
      <div>
        <div>
          <F change={this.SetResults} />
        </div>
        <C results={this.state.results} />
      </div>
    );
  }
}

export default SearchPage;
