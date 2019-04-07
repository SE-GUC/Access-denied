import React from 'react'


function MemberInfo(){
    return(
        <div>
        <form action="/action_page.php">
        <input type="text" name="name" id="input1" value="moaz ashraf" readOnly/>
        <button >edit</button>
        
        <br/>
        
        <input type="text" name="email" id="input2" value="moaazashraf98@yahoo.com" readOnly/>
        <button >edit</button><br/>
        <button >save</button>
        </form> 
        </div>
       
    )
}

export default MemberInfo