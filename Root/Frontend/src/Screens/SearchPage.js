import React, { Component } from 'react';
// import '../Screens/SearchPage.css';
import S from '../Components/searchbar';
import F from '../Components/filterPanel';

class SearchPage extends Component {
  render() {
    return (
     <div>
       <div><S/></div>
        <div><F/></div>
      </div>
      
    )
  }
}

export default SearchPage ;
