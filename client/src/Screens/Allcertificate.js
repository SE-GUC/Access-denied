import React, { Component } from "react";
import { styled } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import indigo from '@material-ui/core/colors/indigo'
import blueGrey from '@material-ui/core/colors/blueGrey'
import { Redirect } from 'react-router-dom'
const axios = require("axios");

const Cardcert = styled(Card)({
  
    maxWidth: 40000,
    width:480,
    

});


class Allcertificate extends Component{
    constructor(props) {
        super(props);
        this.state = {
          certificates :null,
          view :null
        };
      }
    
      onClick=(id)=>()=> {
          console.log("hi");
          console.log(id);
          this.setState({ redirect: true ,reid:id })
      }
      renderRedirect = () => {
          console.log("re")
        if (this.state.redirect) {
          return <Redirect to={'/certificate?id=' + this.state.reid} />
        }
      }
componentDidMount(){
    axios.get(`/api/certification/all`).then(q => {
        console.log(q.data)
        this.setState({
            certificates:q.data,
            view :q.data.map(c=>{
                return (
                    <Grid item>
            <Cardcert  >
              <CardActionArea>
                <CardContent>
                    <Paper >
                  <Typography gutterBottom variant="h5" component="h2"align="center" style={{ color: indigo[500] }}>
                    {c.name}
                  </Typography>
                  </Paper>
                  <Typography component="p">
                   skills : {c.skills}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="medium" color="primary"  onClick={ this.onClick(c._id)}>
                  APPLY 
                </Button>
               
              </CardActions>
            </Cardcert>
            </Grid>
                )
        })
    })
    
    })
}








render(){
    return(
        <div>
        {this.renderRedirect()}
        <Grid container spacing={16}  style={{
            marginTop: '5%',
            marginLeft:'1%',
           
          }}>
        {this.state.view}
        </Grid>
      </div>
    )
}




}




export default  Allcertificate;