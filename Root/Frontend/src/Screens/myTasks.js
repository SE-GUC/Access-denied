import React, { Component } from "react";
import "./myTasks.css";

// import { Redirect } from "react-router-dom";
import { AppConsumer } from "../Containers/AppProvider";
import p from "../Images/tasks.jpeg";
// import Typography from "@material-ui/core/Typography";
// //import Button from "@material-ui/core/Button";
// //import Card from "@material-ui/core/Card";
// import query from "query-string";
// import Divider from "@material-ui/core/Divider";
// import spacing from "@material-ui/core/styles/spacing";
// import indigo from "@material-ui/core/colors/indigo";
// import { styled } from "@material-ui/styles";
// import LinearProgress from "@material-ui/core/LinearProgress";
import axios from 'axios'




  
  // Start App
  
  class myTasks extends Component { 
    
      
      state = {
        posts: {},
        token:null,
        id:null,
        changed:false,
        type:null
      
    }
    
    componentWillMount= async ()=>{
       
        let res = await axios.get(`http://localhost:3001/api/task/mytasks`,{'headers':{'token':this.state.token}})
            console.log(this.state.token)
            let response = res.data
            console.log(response);
            this.setState({
                posts: response
              });
            
        
       
      
     
    }
    render() {
        return( <div>
            <button onClick={this.componentWillMount}>show my tasks</button>
       
            <React.Fragment>
             <AppConsumer>
            {context => {
              if (this.state.changed) return;
            
              this.setState({
                token:String(context.token),
                id: context.id,
                type: context.type,
                changed: true
              });
            }}
          </AppConsumer>
             
          </React.Fragment>
          {/* {this.componentWillMount} */}
          <div className="app-card-list" id="app-card-list">
            {this.componentWillMount.data}
            {
                
              Object
              .keys(this.state.posts)
              .map(key => <Card key={key} index={key} details={this.state.posts[key]}/>)
            }
        </div>
     
        </div>
        )
      }
   
  
   
  }
  
  

  
  class CardHeader extends Component {
    render() {
      const { category } = this.props;
      var style = { 
          backgroundImage: 'url(' + p + ')',
      };
      return (
        <header style={style} className="card-header">
        <marquee behavior="scroll" direction="left" className="card-header--title">{category}</marquee>
        </header>
      )
    }
  }
  
  
  class CardBody extends Component {
    render() {
      return (
        <div className="card-body">
          <p className="date">{this.props.date}</p>
          <p className="body-content">Description : {this.props.description}</p>
          <p className="body-content">Completeness : {this.props.isComplete}</p>
          <p className="body-content">Effort Level : {this.props.effortLevel}</p>
          <p className="body-content">Phase : {this.props.phase}</p>
          <p className="body-content">Extra Notes : {this.props.extraNotes}</p>
          <p className="body-content">Monetary Comp : {this.props.monetaryComp}</p>
          <p className="body-content">Skills : {this.props.skills}</p>
          <p className="body-content">Keywords : {this.props.keywords}</p>
          <p className="body-content">Applied Members : {this.props.applied_members}</p>
          
          
          
         
        </div>
      )
    }
  }
  
  
  class Card extends Component {
    render() {
      return (
        <article className="card">
          <CardHeader category={this.props.details.name} />
          <CardBody description={this.props.details.description} 
                    isComplete={this.props.details.isComplete?"true":"false"}
                    phase={this.props.details.phase}
                    keywords={this.props.details.keywords.length===0?"No keywords":this.props.details.keywords}
                    data={this.props.details.date}
                    effortLevel={this.props.details.effortLevel}
                    extraNotes={this.props.details.extraNotes===null?"No extra notes":this.props.details.extraNotes}
                    monetaryComp={this.props.details.monetaryComp}
                    skills={this.props.details.skills.length===0?"No skills needed":this.props.details.skills}
                    applied_members={this.props.details.applied_members.length===0?"No Applied Members yet":this.props.details.applied_members}
                    date={this.props.details.date}
                    />
        </article>
      )
    }
  }
  
  
export default myTasks;
