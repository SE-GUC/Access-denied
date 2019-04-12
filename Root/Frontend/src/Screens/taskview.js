import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import query from "query-string"
import Divider from '@material-ui/core/Divider';
import spacing from '@material-ui/core/styles/spacing';
import indigo from '@material-ui/core/colors/indigo';
import { styled } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
const axios = require('axios')


const Typographyhead = styled(Typography)({
  
  color:indigo[400] ,
  marginLeft:"1.5%",
  

})
const Typographypara = styled(Typography)({
  
  
  marginLeft:"1.5%"
  

})





class taskview extends Component{
    constructor(props) {
        super(props);
        this.state = {
          task: null,
          name :null
        };
      }

      

    componentDidMount() {

        let taskid = query.parse(this.props.location.search, {
            ignoreQueryPrefix: true
          }).taskid;
        console.log(taskid)
        axios.get(`/api/task/?id=`+taskid)
        .then(q=>{
          console.log(q.data)
            this.setState({
                task: q.data,
                name: q.data.name,
                owner: q.data.owner,
                consaltancy: q.data.consultancy,
                description: q.data.description,
                extranotes: q.data.extraNotes,
                date: q.data.date,
                effortlevel: q.data.effortLevel,
                commitmentlevel:q.data.commitmentLevel,
                experiencelevel: q.data.experienceLevel,
                timerequired: q.data.timeRequired,
                monetrarycomp: q.data.monetaryComp,
                skills: q.data.skills
            
            })
            console.log(this.state.name)
            console.log(this.state.owner)

        }


        )
    }
    
    render(){
      while(this.state.task==null){
        return(
          <paper> <LinearProgress style={{top:spacing.unit*45}}/>   </paper>
          
        )
      }
        
       
        return(
     
           
           
          <div>
            <Paper style={{ maxWidth:800 ,marginLeft:"20%",color: 'white',marginTop:"5%"}}>
            <Typography gutterBottom variant="h3" component="h2" align="center" style={{color:indigo[500]}} >
            {this.state.name==null? "No Data Avaliable":this.state.name}
          </Typography>
              </Paper>
 
            <Card className="taskpaper" elevation={1} style ={{ maxWidth: 800 , marginLeft:"20%"}}>
            <Typographyhead variant="h5" component="h4" >
                Description 
            </Typographyhead>
            <Typographypara variant="body1" component="h5">
            {this.state.description==null? "No Data Avaliable":this.state.description}
            </Typographypara>
              <Divider variant="middle"  style={{ marginTop:"3%"}}/>
              <Typographyhead variant="h5" component="h4">
                Extranotes
              </Typographyhead>
              <Typographypara variant="body1" component="h5">
              {this.state.extranotes==null? "No Data Avaliable":this.state.extranotes}
               
              </Typographypara> 
              <Divider variant="middle" style={{ marginTop:"3%"}} />
              <Typographyhead variant="h5" component="h4">
               Owner
              </Typographyhead>
              <Typographypara variant="body1" component="h5">
                {this.state.owner}
              </Typographypara> 
              <Divider variant="middle" style={{ marginTop:"3%"}} />
              <Typographyhead variant="h5" component="h4">
               Consaltancy
              </Typographyhead>
              <Typographypara variant="body1" component="h5">
                {this.state.consaltancy==null? "No data Avaliable":this.state.consaltancy}
              </Typographypara> 
              <Divider variant="middle" style={{ marginTop:"3%"}} />
              <Typographyhead variant="h5" component="h4">
                Experience level
              </Typographyhead>
              <Typographypara variant="body1" component="h5">
              {this.state.experiencelevel==null? "No data Avaliable":this.state.experiencelevel}
              </Typographypara> 
              <Divider variant="middle" style={{ marginTop:"3%"}} />
              <Typographyhead variant="h5" component="h4">
                Commitment level 
              </Typographyhead>
              <Typographypara variant="body1" component="h5">
              {this.state.commitmentlevel==null? "No data Avaliable":this.state.commitmentlevel}
              </Typographypara> 
              <Divider variant="middle"  style={{ marginTop:"3%"}}/>
              <Typographyhead variant="h5" component="h4">
               Effort  level 
              </Typographyhead>
              <Typographypara variant="body1" component="h5">
              {this.state.effortlevel==null? "No data Avaliable":this.state.effortlevel}
           
              </Typographypara> 
              <Divider variant="middle"  style={{ marginTop:"3%"}}/>
              <Typographyhead variant="h5" component="h4">
               Time required
              </Typographyhead>
              <Typographypara variant="body1" component="h5">
              {this.state.timerequired==null? "No data Avaliable":this.state.timerequired}
              
              </Typographypara> 
              <Divider variant="middle" style={{ marginTop:"3%"}} />
              <Typographyhead variant="h5" component="h5">
               Monetrary comp
              </Typographyhead>
              <Typographypara variant="body1" component="h5">
              {this.state.monetrarycomp==null? "No data Avaliable":this.state.monetrarycomp}
              
             
              </Typographypara> 
              <Divider variant="middle" style={{ marginTop:"3%"}} />
              <Typographyhead variant="h5" component="h4">
               Skills
              </Typographyhead>
              <Typographypara variant="body1" component="h5">
              {this.state.skills==null? "No data Avaliable":this.state.skills}
              
              </Typographypara> 
               </Card>
            
            <Button size="large" variant="contained" color="primary" className="applybutton" style={{
                marginLeft: "65%",margintop:"30", maxWidth:50,bottom:spacing.unit*10}}>
                Apply
             </Button>
            
            
             </div>
       





        )
    }
}

















export default  taskview ;