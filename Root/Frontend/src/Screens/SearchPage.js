import React, { Component } from "react";
import "../Screens/SearchPage.css";
import Search from "../Components/searchbar";
import Filter from "../Components/filterPanel";

class SearchPage extends Component {
  render() {
    return (
      <div>
        <div>
          <Search />
        </div>
        <div>
          <Filter />
        </div>
      </div>
    );
  }
}

export default SearchPage;
