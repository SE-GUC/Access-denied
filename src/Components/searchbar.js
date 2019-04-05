import React from 'react';
import { appendFileSync } from 'fs';
//  import '../Screens/SearchPage.css';
class Searchbar extends React.Component{
     render(){

    

         return(
          <div>
            <div className="searchnav">
            <input type="text"  id='se' placeholder="Search.."
             onKeyPress={event => {
              if (event.key === 'Enter') {
                this.search(document.getElementById('se').value)
              }}}
            />
            
          </div>
         
        <form>
          <div>
            <input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter"/>
            <label htmlFor="subscribeNews">Subscribe to newsletter?</label>
          </div>
          <div>
          <form> 
  <input type="button" value="Start machine"/>
</form>
<p>The machine is stopped.</p>
      
          </div>
        </form>
           </div>
         )
     }

     search( keywords ){
      //to do search function
      console.log(keywords)
    
     }
 }

 export default Searchbar;