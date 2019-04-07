import React, { Component } from 'react';
import axios from 'axios';
// import '../Screens/SearchPage.css';
import S from '../Components/searchbar';
import F from '../Components/filterPanel';
import C from '../Components/results';

class SearchPage extends Component {

  state = {
    results: []
      }

      async GetTasks() {
        axios.get(`http://localhost:3001/api/task/all`)
          .then(res => {
            const task = res.data;
            this.setState( {tasks:task} );
          })}
          
  render() {
    await this.GetTasks();

    return (
     <div>
       <div><S/></div>
        <div><F/></div>
        <C results={this.state.results} />
      </div>
      
    )
  }
}

export default SearchPage ;
