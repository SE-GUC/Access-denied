import React from 'react';
 import './App.css';
class Searchbar extends React.Component{
     render(){
         return(
            <div className="searchnav">
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