import React from "react";
import { appendFileSync } from "fs";
//  import '../Screens/SearchPage.css';
class Searchbar extends React.Component {
  render() {
    return (
      <div>
        <div className="searchnav">
          <input
            type="text"
            id="se"
            placeholder="Search.."
            onKeyPress={event => {
              if (event.key === "Enter") {
                this.search(document.getElementById("se").value);
              }
            }}
          />
        </div>
      </div>
    );
  }

  search(keywords) {
    //to do search function
    console.log(keywords);
    console.log(JSON.stringify(this.props.Tags))
    let y =JSON.stringify(this.props.Tags)
    console.log(y);
    fetch(`search/filteredby?tags=`+y)
    .then(res => res.json())
    .then(res => {
      this.props.fu(res)
    })
    .catch(err => {
      console.log(err);
    });
  }
}

export default Searchbar;