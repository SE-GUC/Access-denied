import React from "react";
import Client from "./Client";

const MATCHING_ITEM_LIMIT = 25;

class FoodSearch extends React.Component {
  state = {
    foods: [],
    showRemoveIcon: false,
    searchValue: ""
  };

  handleSearchChange = e => {
    const value = e.target.value;

    this.setState({
      searchValue: value
    });

    if (value === "") {
      this.setState({
        foods: [],
        showRemoveIcon: false
      });
    } else {
      this.setState({
        showRemoveIcon: true
      });

      Client.search(value, foods => {
        this.setState({
          foods: foods.slice(0, MATCHING_ITEM_LIMIT)
        });
      });
    }
  };
  function search(query, cb) {
    return fetch(`api/food?q=${query}`, {
      accept: "application/json"
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(cb);
  }
  
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
  
  function parseJSON(response) {
    return response.json();
  }
  var tempSchema = new Schema({    
    _id: {type: Schema.ObjectId, auto: true},
    name:{type: String},
    sample_details:{
      _id: false,
      objects: [{
        object_key:{type: String},
        object_value:{type: String, get:decrypt, set:encrypt}
      }],
      type_params:[{
        type_key:{type: String},
        type_value:{type: String, get:decrypt, set:encrypt}
      }],
      test_body:{type: String, get:decrypt, set:encrypt}
    }}, {
    toObject : {getters: true, setters: true},
    toJSON : {getters: true, setters: true}
  });
  const Client = { search };
  export default Client;