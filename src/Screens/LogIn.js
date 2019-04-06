import React from 'react';

class LogIn extends React.Component{
  constructor(){
      super();
      this.state={
        user: " ",
        password: " "
      }
  }
  handleUser(event){
   this.setState({
     user:event.target.value
   })
  }
  handlePassword(event){
    this.setState({
      password:event.target.value 
    })
  }
  handleLogIn(){
   alert(this.state.user + " is logging in ")
  }
 render() {
    return (
      <div>
          <p>Email or Username</p>
          <input type="textbox"  onChange={this.handleUser.bind(this)}  />
          <p> Password</p>
          <input type="textbox" onChange={this.handlePassword.bind(this)} />
          <br />
          <br />
          <button onClick ={this.handleLogIn.bind(this)}> Log In </button>
      </div>
    )
}}

export default LogIn;
