import React from "react";
import { appendFileSync } from "fs";
//  import '../Screens/SearchPage.css';
import { InputGroup, Button, Form } from "react-bootstrap";
class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <InputGroup className="searchnav">
        <Form.Control
          id="searchtext"
          placeholder="Search..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onKeyPress={event => {
            if (event.key === "Enter") {
              this.handleChange(event.target);
            }
          }}
        />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={() =>
              this.handleChange(document.getElementById("searchtext"))
            }
          >
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }

  handleChange(event) {
    //to do search function
    let y = event.value;
    console.log(y);
    fetch(`search?q=` + y)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.props.change(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default Searchbar;
