import React from 'react';
import { appendFileSync } from 'fs';
 import './App.css';
class Searchbar extends React.Component{
     render(){
         return(
            <div class="searchnav">
          
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous"></link>
            <i class="fas fa-cloud"></i>
            <input type="text"  id='se' placeholder="Search.."
             onKeyPress={event => {
              if (event.key === 'Enter') {
                this.search(document.getElementById('se').value)
              }}}
            />
            
          </div>
         )
     }
 search( keywords ){
     //to do search function
     console.log(keywords)
 }


 }
 export default Searchbar;